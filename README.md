# ACHARPREMIUM

## Deploying publicly

This is a static site and is deployed with the GitHub Pages workflow in
`.github/workflows/pages.yml`. After merging the workflow into `main`, the
repository owner must set **Settings > Pages > Build and deployment > Source**
to **GitHub Actions** once. Subsequent pushes to `main` deploy automatically.

The workflow uses GitHub's built-in `GITHUB_TOKEN`; no SSH key, private key, or
third-party deployment credential is required.
