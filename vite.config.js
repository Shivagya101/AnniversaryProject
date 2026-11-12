import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function anniversaryApiPlugin() {
  const jsonFilePath = path.resolve(process.cwd(), 'responses.json');
  const txtFilePath = path.resolve(process.cwd(), 'responses.txt');

  // Ensure initial files exist so the user can see them right away
  if (!fs.existsSync(jsonFilePath)) {
    fs.writeFileSync(
      jsonFilePath,
      JSON.stringify(
        {
          project: '3-Year Anniversary Scrapbook (14 Nov 2023 - 14 Nov 2026)',
          updatedAt: null,
          answers: {},
          foreverAnswer: null,
          history: []
        },
        null,
        2
      ),
      'utf-8'
    );
  }

  if (!fs.existsSync(txtFilePath)) {
    fs.writeFileSync(
      txtFilePath,
      '====================================================\n' +
        '   OUR 3-YEAR ANNIVERSARY SCRAPBOOK - HER ANSWERS   \n' +
        '   (14th November 2023 — 14th November 2026)        \n' +
        '====================================================\n\n' +
        'No answers recorded yet. Once she selects options on the website,\n' +
        'they will automatically be saved here!\n',
      'utf-8'
    );
  }

  const formatTxtFile = (data) => {
    const lines = [
      '====================================================',
      '   OUR 3-YEAR ANNIVERSARY SCRAPBOOK - HER ANSWERS   ',
      '   (14th November 2023 — 14th November 2026)        ',
      '====================================================',
      `Last Updated: ${data.updatedAt || 'Never'}`,
      '',
      '--- MULTIPLE CHOICE ANSWERS ---'
    ];

    const entries = Object.values(data.answers || {});
    if (entries.length === 0) {
      lines.push('(No MCQ options selected yet)');
    } else {
      entries.forEach((entry, idx) => {
        lines.push(`${idx + 1}. Question: ${entry.question}`);
        lines.push(`   Her Choice: ${entry.selectedOption}`);
        lines.push(`   Time: ${entry.timestamp}`);
        lines.push('');
      });
    }

    lines.push('--- FINAL QUESTION ---');
    if (data.foreverAnswer) {
      lines.push(`Question: ${data.foreverAnswer.question}`);
      lines.push(`Her Answer: ${data.foreverAnswer.answer}`);
      lines.push(`Time: ${data.foreverAnswer.timestamp}`);
    } else {
      lines.push('(Final question not answered yet)');
    }

    lines.push('');
    lines.push('====================================================');
    return lines.join('\n') + '\n';
  };

  const attachRoutes = (middlewares) => {
    middlewares.use('/api/responses', (req, res, next) => {
      if (req.method === 'GET') {
        try {
          const raw = fs.readFileSync(jsonFilePath, 'utf-8');
          res.setHeader('Content-Type', 'application/json');
          res.end(raw);
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to read responses.json' }));
        }
        return;
      }
      next();
    });

    middlewares.use('/api/save-response', (req, res, next) => {
      if (req.method !== 'POST') return next();

      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          let current = {
            project: '3-Year Anniversary Scrapbook (14 Nov 2023 - 14 Nov 2026)',
            updatedAt: null,
            answers: {},
            foreverAnswer: null,
            history: []
          };

          if (fs.existsSync(jsonFilePath)) {
            try {
              current = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
            } catch {
              // keep default if malformed
            }
          }

          const timestamp = new Date().toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'medium'
          });
          current.updatedAt = timestamp;

          if (payload.type === 'mcq') {
            current.answers = current.answers || {};
            current.answers[payload.questionId] = {
              questionId: payload.questionId,
              question: payload.question,
              selectedOption: payload.selectedOption,
              timestamp
            };
          } else if (payload.type === 'forever') {
            current.foreverAnswer = {
              question: payload.question,
              answer: payload.answer,
              timestamp
            };
          }

          current.history = current.history || [];
          current.history.push({
            ...payload,
            timestamp
          });

          fs.writeFileSync(jsonFilePath, JSON.stringify(current, null, 2), 'utf-8');
          fs.writeFileSync(txtFilePath, formatTxtFile(current), 'utf-8');

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true, savedTo: ['responses.txt', 'responses.json'], data: current }));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: err.message }));
        }
      });
    });

    // Built-in API endpoint for the 30-second finale video
    middlewares.use('/api/video', (req, res, next) => {
      if (req.method !== 'GET') return next();
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          title: 'Why I Love You So Much — Happy 3 Year Anniversary',
          durationSeconds: 30,
          // Replace this videoUrl with your own hosted video link or place `anniversary-video.mp4` inside `public/videos/`
          videoUrl: '/videos/anniversary-video.mp4',
          fallbackDemoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          subtitle: '3 Years Down, Forever To Go (14.11.2023 — 14.11.2026)'
        })
      );
    });
  };

  return {
    name: 'anniversary-api-plugin',
    configureServer(server) {
      attachRoutes(server.middlewares);
    },
    configurePreviewServer(server) {
      attachRoutes(server.middlewares);
    }
  };
}

export default defineConfig({
  plugins: [react(), anniversaryApiPlugin()]
});

