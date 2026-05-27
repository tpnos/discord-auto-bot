# Discord Bot Starter

Node.js + discord.js 기반 최소 디스코드 봇입니다.

## 포함 기능

- `/ping` slash command
- 버튼 interaction
- `.env`로 `DISCORD_TOKEN` 관리
- Railway 배포용 `package.json` start script
- Guild command 등록 스크립트

## 1. 설치

```bash
npm install
```

## 2. 환경변수 설정

`.env.example` 파일을 복사해서 `.env`로 만드세요.

```bash
cp .env.example .env
```

그리고 `.env`에 값을 입력하세요.

```env
DISCORD_TOKEN=봇_토큰
CLIENT_ID=애플리케이션_CLIENT_ID
GUILD_ID=테스트_서버_ID
```

## 3. Slash command 등록

```bash
npm run deploy
```

성공하면 테스트 서버에서 `/ping` 명령어가 보입니다.

## 4. 봇 실행

```bash
npm start
```

## 5. Railway 배포

Railway에 GitHub 저장소를 연결한 뒤 Variables에 아래 값을 추가하세요.

```env
DISCORD_TOKEN=봇_토큰
CLIENT_ID=애플리케이션_CLIENT_ID
GUILD_ID=테스트_서버_ID
```

Railway는 `package.json`의 아래 script로 실행됩니다.

```json
"start": "node src/index.js"
```

## Discord Developer Portal 설정

봇 초대 URL 생성 시 권한:

- `bot`
- `applications.commands`

Bot permissions는 최소 테스트용으로:

- Send Messages
- Use Slash Commands

## 파일 구조

```txt
discord-bot-starter
├─ package.json
├─ .env.example
├─ .gitignore
├─ README.md
└─ src
   ├─ index.js
   ├─ deploy-commands.js
   └─ commands
      └─ ping.js
```
