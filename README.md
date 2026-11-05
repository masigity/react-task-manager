# Task Manager App

A compact task manager built with React. Add tasks with a priority, search and filter them, and track progress with a status panel and two small charts. Everything is saved in your browser, so no account or server is needed.

[Task Manager App screenshot](docs/screenshot.png)

## 🌐 Live Website

Check out my live project here:

[Task Manager App](https://masigity.github.io/react-task-manager/)

## Features

- Add, edit, complete and delete tasks, each with a Low, Medium or High priority
- Search, plus status and priority filters with live counts
- Status panel: On track, Busy or Falling behind, with tasks left and finished today
- Doughnut and bar charts of your tasks
- Activity log of every change
- Light and dark mode, saved automatically

## Getting started

```bash
git clone https://github.com/masigity/react-task-manager.git
cd react-task-manager
npm install
npm run dev
```

## Tech

React, plain CSS and inline SVG. No UI or chart libraries.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
