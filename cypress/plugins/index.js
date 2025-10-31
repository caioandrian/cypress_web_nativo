/// <reference types = "cypress"/>

const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');  
const exec = require('child_process').execSync;  
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve(
    './cypress/config-files',
    `${file}.json`
  );

  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
  on('after:screenshot', (details) => {
    // Renomeia o arquivo de screenshot para usar apenas o nome do teste (it)
    console.log('Screenshot capturado - caminho original:', details.path);
    
    if (details.path && details.path.includes(' -- ')) {
      try {
        // Normaliza o caminho para funcionar em Windows e Linux
        const normalizedPath = details.path.replace(/\\/g, '/');
        const pathParts = normalizedPath.split('/');
        const fileName = pathParts[pathParts.length - 1];
        
        if (fileName.includes(' -- ')) {
          const newFileName = fileName.split(' -- ')[1];
          const dirPath = pathParts.slice(0, -1).join(path.sep);
          
          // Constrói o novo caminho usando path.join para compatibilidade
          const newPath = path.join(dirPath, newFileName);
                    
          // Move o arquivo para o novo nome
          if (fs.existsSync(details.path)) {
            fs.moveSync(details.path, newPath, { overwrite: true });
            return { path: newPath };
          } else {
            console.log('Erro: Arquivo não encontrado no caminho', details.path);
          }
        }
      } catch (error) {
        console.error('Erro ao renomear screenshot:', error);
      }
    }
    return { path: details.path };
  });
  
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      //launchOptions.args.push("--incognito");
      launchOptions.args.push('--disable-dev-shm-usage');
    }

    if (browser.name == 'chrome') {
      launchOptions.args.push('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36');
      launchOptions.args.push('--disable-gpu');
    }

    /*if (browser.name === 'electron') {                
      launchOptions.preferences.incognito = true
    }*/
 
    return launchOptions;
  });

  on('before:run', async (details) => {  
    await beforeRunHook(details);  
    await exec("node ./cypress/support/clear.js");
  });

  on('after:run', async (results) => {  
    if (results) {
      await fs.mkdirSync("cypress/run", { recursive: true });
      await fs.writeFile("cypress/run/results.json", JSON.stringify(results));
    }

    await exec("npx jrm ./cypress/reports/junitreport.xml ./cypress/reports/junit/*.xml");
    await afterRunHook();
  });

  const file = config.env.fileConfig || 'hmg';
  return getConfigurationByFile(file);
};