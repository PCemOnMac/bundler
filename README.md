## macOS App Bundler, IconSet creator and DMG installer creator

This script is meant to be used with PCem, but could also easily be adapted to your needs
if you're facing a similar problem with another binary on a macOS system.

For PCem, first build a version of PCem (choose from the other repo's here) -- follow the 
respective versions README for the instructions. Make sure you call `make` as:

  `make -j4 -Wl,headerpad_max_install_names`

Then run `sh bundle $PATH_TO_PCEM_BUILD_DIR` -- e.g.:

  `sh bundle ../PCemV17macOS/`

The build dir is the directory, where you can find the `pcem` executable binary after calling `make`.

### Prerequisites

In order for this script to run smoothly, you need a few pieces of third-party software components:

1. `create-dmg`: Run `brew install create-dmg`
2. Node.js: Run: `brew install node`