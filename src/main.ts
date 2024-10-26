import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as figlet from 'figlet';
import * as chalk from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APPLICATION_PORT);
  showBanner();
}

function showBanner(): void {
  interface Coder {
    username: string;
    personalName: string;
  }

  const mainCoders: Coder[] = [
    {
      personalName: 'Muhammad Reza Ravelinno',
      username: '@ravel28',
    },
  ];

  figlet(
    'VELMART API',
    {
      font: 'Slant',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      whitespaceBreak: false,
    },
    function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }

      let borderMaxLength = 0;

      console.log(chalk.whiteBright('\n' + data));
      const formatInfo = (label: string, value: string) => {
        return `${label.padEnd(20)}: ${value.padEnd(10)}`;
      };

      const aplicationLine = formatInfo('Name', process.env.APPLICATION_NAME);
      const versionLine = formatInfo(
        'Application Version',
        process.env.npm_package_version || 'N/A',
      );
      const portLine = formatInfo(
        'Port',
        process.env.APPLICATION_PORT || 'N/A',
      );
      const developerLine = formatInfo(
        'Developer',
        'Muhammad Reza Ravelinno',
      );

      console.log(developerLine);
      console.log(versionLine);
      console.log(portLine);
    },
  );
}

bootstrap();
