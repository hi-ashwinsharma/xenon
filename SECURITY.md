# Security Policy

## Reporting a vulnerability

Do not open a public issue. Report privately through GitHub:
**Security tab, then "Report a vulnerability"**, in this repository.

Include the affected area, reproduction steps and the impact. You will get an acknowledgement as soon as practical.

## Secrets

Never commit credentials, API keys or Firebase service accounts. `.env*` files are git-ignored. Use Vercel environment variables for deployment secrets.
