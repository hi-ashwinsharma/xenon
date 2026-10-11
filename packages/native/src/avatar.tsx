import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useMemo,
  useState,
} from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  DEFAULT_RADIUS_STOP,
  compileNativeTokens,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
} from "@xenon/tokens";
import {
  getInitials,
  resolveAvatarDimensions,
  type AvatarSize,
  type AvatarStatus,
} from "@xenon/core";
import { useXenon } from "./provider";
import { Text } from "./text";
import type { NativeAvatarGroupProps, NativeAvatarProps } from "./native.types";

interface AvatarGroupContextValue {
  readonly size?: AvatarSize;
}

const AvatarGroupContext = createContext<AvatarGroupContextValue | null>(null);

const statusColors: Record<AvatarStatus, string> = {
  online: "#30d158",
  busy: "#ff453a",
  away: "#ffd60a",
  offline: "#86868b",
};

function useAvatarTokens() {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";
  let radius: RadiusStop = DEFAULT_RADIUS_STOP;
  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
    radius = xenon.radius;
  } catch {}

  const tokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  return { tokens, radius };
}

export function Avatar({
  src,
  name,
  fallback,
  size: explicitSize,
  shape = "circle",
  status,
  statusPlacement = "bottom-right",
  onError,
  style,
  textStyle,
  children,
}: NativeAvatarProps) {
  const { tokens, radius } = useAvatarTokens();
  const groupContext = useContext(AvatarGroupContext);
  const size = explicitSize ?? groupContext?.size ?? "md";
  const metrics = resolveAvatarDimensions(size);

  const [imageError, setImageError] = useState(false);

  const borderRadius =
    shape === "circle" ? 9999 : tokens.radius[radius].control * 0.75;

  const statusDotSize = metrics.statusSize;

  return (
    <View
      style={[
        styles.avatarContainer,
        {
          width: metrics.size,
          height: metrics.size,
          borderRadius,
          backgroundColor: tokens.colors.surface,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: tokens.colors.border,
        },
        style,
      ]}
    >
      {children ? (
        children
      ) : src && !imageError ? (
        <Image
          source={{ uri: src }}
          onError={() => {
            setImageError(true);
            onError?.();
          }}
          style={[
            styles.image,
            {
              width: metrics.size,
              height: metrics.size,
              borderRadius,
            },
          ]}
        />
      ) : name ? (
        <Text
          styleKey="caption1"
          weight={400}
          style={[
            {
              fontSize: metrics.fontSize,
              color: tokens.colors.text,
              textAlign: "center",
            },
            textStyle,
          ]}
        >
          {getInitials(name)}
        </Text>
      ) : fallback ? (
        fallback
      ) : (
        <Text
          styleKey="caption1"
          style={{ fontSize: metrics.fontSize, color: tokens.colors.textMuted }}
        >
          •
        </Text>
      )}

      {status && (
        <View
          style={[
            styles.statusDot,
            {
              width: statusDotSize,
              height: statusDotSize,
              borderRadius: 9999,
              backgroundColor: statusColors[status],
              borderColor: tokens.colors.bg,
            },
            statusPlacement === "bottom-right"
              ? { bottom: -1, right: -1 }
              : { top: -1, right: -1 },
          ]}
        />
      )}
    </View>
  );
}

export function AvatarGroup({
  max,
  size = "md",
  spacing = "normal",
  children,
  style,
}: NativeAvatarGroupProps) {
  const { tokens } = useAvatarTokens();
  const spacingMargin =
    spacing === "tight" ? -12 : spacing === "loose" ? -6 : -9;

  const childList = Children.toArray(children).filter(isValidElement);
  const visibleChildren = max ? childList.slice(0, max) : childList;
  const overflowCount = max ? childList.length - max : 0;
  const metrics = resolveAvatarDimensions(size);

  return (
    <AvatarGroupContext.Provider value={{ size }}>
      <View style={[styles.group, style]}>
        {visibleChildren.map((child, index) => {
          const avatarElement = child as React.ReactElement<NativeAvatarProps>;
          const avatarStyle = [
            index > 0 && { marginLeft: spacingMargin },
            {
              borderWidth: 2,
              borderColor: tokens.colors.bg,
              zIndex: visibleChildren.length - index,
            },
            avatarElement.props.style,
          ];

          return cloneElement(avatarElement, {
            key: avatarElement.key ?? index,
            style: avatarStyle,
          });
        })}

        {overflowCount > 0 && (
          <View
            style={[
              styles.overflow,
              {
                width: metrics.size,
                height: metrics.size,
                borderRadius: 9999,
                backgroundColor: tokens.colors.surface,
                borderColor: tokens.colors.bg,
                borderWidth: 2,
                marginLeft: spacingMargin,
              },
            ]}
          >
            <Text
              styleKey="caption2"
              weight={400}
              style={{
                fontSize: metrics.fontSize,
                color: tokens.colors.textMuted,
              }}
            >
              +{overflowCount}
            </Text>
          </View>
        )}
      </View>
    </AvatarGroupContext.Provider>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  image: {
    resizeMode: "cover",
  },
  statusDot: {
    position: "absolute",
    borderWidth: 1.5,
    zIndex: 2,
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
  },
  overflow: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
});
