const childProcess = require('child_process');
const { basename } = require('path');

console.log('Removing pre-written local dylibs...');

// clean
childProcess.execSync('rm -rf macos/build/PCem.app/Contents/MacOS/*.dylib', {
    stdio: 'inherit'
});

console.log(`Analyzing pcem executable...`);

const stdout = childProcess.execSync(`otool -L macos/build/PCem.app/Contents/MacOS/pcem`, {
    stdio: 'pipe',
}).toString();

const stdoutLines = stdout.split('\n');
const dylibs = [];

for (let i=0; i<stdoutLines.length; i++) {

    // statically analyze dylibs of the executable pcem binary
    if (stdoutLines[i].indexOf('.dylib') > -1) {
        dylibs.push(stdoutLines[i].trim().split(' ')[0]);
    }
}

console.log(`Re-writing dylibs of local pcem executable...`);

for (let i=0; i<dylibs.length; i++) {

    // copy over system dylib into local App bundle
    childProcess.execSync(`cp ${dylibs[i]} macos/build/PCem.app/Contents/MacOS`, {
        stdio: 'inherit'
    });

    // re-link dylib to locally available App bundle dylib
    childProcess.execSync(`install_name_tool -change ${dylibs[i]} @executable_path/${basename(dylibs[i])} macos/build/PCem.app/Contents/MacOS/pcem`)
}


console.log('Dylibs bundled into local App bundle: ', dylibs);
console.log('Re-written dylibs in local executable: ');

childProcess.execSync(`otool -L macos/build/PCem.app/Contents/MacOS/pcem`, {
    stdio: 'inherit',
})