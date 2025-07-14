# Changelog

All notable changes to the My Assets Page project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Created comprehensive UI text reference document (`UI_TEXT_REFERENCE.md`) documenting all deletion modal and toast message texts
- Created comprehensive tooltip text reference document (`TOOLTIP_TEXT_REFERENCE.md`) documenting all tooltip texts and implementations

## [1.1.0] - 2025-01-14

### Changed
- Updated subscription banner button to link to Shopper Similarweb subscriptions page (https://shopper.similarweb.com/subscriptions?)
- Converted subscription button from non-functional button to functional link that opens in new tab

### Technical Details
- Changed `<button class="subscribe-button">` to `<a href="https://shopper.similarweb.com/subscriptions?" target="_blank" class="subscribe-button">`
- Maintained existing styling and visual appearance
- Added `target="_blank"` to open subscriptions page in new tab

### Deployment
- Deployed to production: https://my-assets-page.netlify.app
- Committed as: bfb8857 