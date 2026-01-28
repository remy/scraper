## 2.0.0

**BREAKING CHANGE**: Updated handler function signature from `(req, res, browser)` to `(context)` object.

- **New context object**: Scripts now receive `{ request, response, browser, cheerio }` instead of separate parameters
- All user scripts must be updated to use the new context destructuring pattern
- Added example scripts demonstrating the new signature
- Updated documentation with migration guidance

## 1.3.3

- Add reload buttons
- Make navigation sticky
- Bake cheerio as a core dep

## 1.3.2

- Small fix that caused entire header to be clickable

## 1.3.1

- Fixed being able to read node modules
- Simplified UI for upload

## 1.3.0
- Added support for external node modules
- Improve UI in the editor

## 1.0.0
- Initial release.
