# Biomarkers UI Demo

## Description

This project is a UI demo that shows my skills in the following technologies:
- React v19
- TypeScript
- Tailwind CSS


The UI allows users to see clinical results with the following features:

- Filter results by biomarker category.
- Sort results by biomarker name and anomality variation, and by ascending and descending order.
- Access to detailed information per clinical result.
- Allow users to store notes per biomarker (not per result).
- Simple keyboard navigation through all app: 'tab' for cards and buttons and 'arrow keys' for filter and sort options.
- Scren responsive design.


## Live version

This UI can be tried at https://biomarkers-ui-2alin.vercel.app/

The following query parameters can be used there to test as well.

## Testing with URL Query Parameters

In order to test the loading and the error page, we have added support through query parameters:

- Loading page: add `secondsDelay=[secondsValue]` to delay initial loading page by `secondsValue` seconds. For example `secondsDelay=5` will delay loading by 5 seconds. By default, page takes 3 seconds to load (to simulate real case scenario).
- Error page: add `simulateError` to simulate that there was a problem with fetching data.

Mixing both parameters is not supported: the error will show first in those cases.

## Project structure

The main codebase is in the `src` directory and contains the following:

- `/api`: A simple layer that allows the UI to retrieve the clinical results and biomarkers data. It also adds real scenario communication details like delays.
- `/assets`: Icons required by the app. All of them are being provided by the [lucide project](https://github.com/lucide-icons/lucide) under their free for comercial and personal use license. It also contains the 'LUCIDE_LICENSE' file that is required.
- `/components`: Small enough components that can be reused.
- `/contexts`: State contexts that can be accessed across different levels of the app.
- `/layouts`: UI structure that can be used to place other sections in a page.
- `/pages`: Interfaces that are populated with smaller sections or components and are meant to provide independent experiences to the user.
- `/sections`: Fundamental parts of a page and that consume smaller components.
- `/storage`: A simple layer that allows to read and store from local storage.
- `/utilities`: Resusable methods across the app.

## Setup Instructions

- Install dependencies with `npm install`
- Start dev mode with `npm run dev` and open link given in your terminal
- Or build with `npm run build`

