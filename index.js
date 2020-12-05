/**
 * Skript-combiner
 * v1.0.0
 * This skript combine all your scripts in workspace to one file.
 */

 const fs = require('fs')
 const glob = require("glob")
 const workspaceFolder = process.argv[2]
 const outFile = process.argv[3] ?? 'out.sk'
 if (!workspaceFolder) throw new Error("workspace folder not set!")

    async function ls(path, current = '') {
        const target = fs.createWriteStream(outFile, { encoding: 'utf-8' })
        console.info("I started combining operation")
        
        glob(workspaceFolder + "/**/*.sk", function (er, files) {
          files.sort((a, b) => a.split('/').length - b.split('/').length).forEach(file => {
            const data = fs.readFileSync(file, { encoding: 'utf-8' })
            target.write(Buffer.from(`# File path: ${file}\n` + data + '\n\n'))
          })

          target.close()
          console.info("I combined " + files.length + " files! Let's Skript!")
        })
    }

    ls(workspaceFolder).catch(console.error)