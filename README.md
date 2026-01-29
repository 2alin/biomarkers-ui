# My solution to Aescolab Frontend Assignment

## Description

This project contains the codebase for my solution to the Aescolab Frontend Assignment. A UI that allows users to see their clinical results with the following features:

- Filter results by biomarker category.
- Sort results by sample date and biomarker name and by ascending and descending order.
- Access to detailed information per clinical result.
- Allow users to store notes per biomarker (not per result).
- Simple keyboard navigation through all app: 'tab' for cards and buttons and 'arrow keys' for filter and sort options.
- Scren responsive design.

## Live version

This UI can be tried at https://frontend-assignment-solution.vercel.app/

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

## Automated tests

No automated tests were implemented due to time constrain and focus on requested deliverables.

## Use case assumptions

- Users are people that care for their health: professionals and seniors
- User has the time to focus in the content of the app
- User's language written form is Left-To-Right. This is a temporal assumption due to time constrain.

## Decisions and trade-offs

From the research I made in the type of users we may have, I decided for three charactistics to stay prevelant in the UI:

- Clarity: User is using the UI to learn from data, the less polluted the UI is the better the user will be able to navigate through all the information.
- Visibility (text): User may be a senior and requires that the text is legible enough. We shouldn't deviate too much from normal font size (16px).
- Usability: User should be able to navigate through a list of data while more detailed data is at hand. User's time should be in analysing the data, not being distracted by UI functionality.

### Fetching data and UI loading

For heavy data applications, we should fragmentize the requests of data per component that use it. But for the current use case, the data per user is small. 

Fragmentizing requests will add complexities that are not benefitial to the user experience. So I decided to fetch all the needed data at once on UI initialization and hold it in memory so all UI components can use it.

### Sticked (always visible) top bars

I always try to not take as much space as possible from the user, but there were two elements that I decided to always show:

- Title bar: Only as a normal constraint of a real case app or page, not because it's needed in this case.
- Category selector: As a user I would like to have easy access to groups that allow me to scan (and change) clinical results in a high level, so I can get a first impression before going into details.

### Sorting type and order

I provided sorting by name as it was suggested but as a user I find important that I can see the results by date, so I added that sort type as well.

Also, as a user the order importance is different depending on the type: a user sorting by date may want to see newest results first (descendence) but a user sorting by name may want to see by alphabetical order (ascendence). Because of that the 'default order' is different per type, but the user can manually change the sort order as well.

### Results Cards

I decided to go with cards as it's a very graphic way to display information instead of a table: we have the freedom to focus the user in specific areas.

Also, a user expects the whole card to be clickable if there's no prominent buttons inside (which is our case). In order to allow cards to be clickable I had two options:

- (easier to implement) Whole card is a button that can be announced to screen readers and interacted by keyboard, but user can't select text.
- (harder to implement) Having an invisibe button inside the card that expands to cover the whole card. Hard to implement as we need to make adjustments to make it accessibel to screen readers and keyboard navigation.

As the card is a visual representation of the information and the information in there is composed of very small units, I decided that a user may not need to select text from there: they can always select any information from the expanded card information drawer.

### Details view

I had two options: modal/dialog or drawer.

As we don't want the user to be distracted by too many open/close actions, I went for drawer as it can show always information to the user while they still scrolls through the list, only if the space allows it: in narrow screens, the space is totally taken by the drawer.

I'm happy with the current structure of the details view as it satifies my minimum criteria, but more love can be given if I were to have more time.

### Stored notes

We want to allow the user to store personal notes in the details view after they click on a clinical result, but! it wouldn't make sense that the user stores note per clinical result as old results are not more relevant.

So I decided to store notes per biomarker related to the clinical result: notes that I added to old results of Vitamin B (for example) will still be shown and edited to new results of the same vitamin.

### Keyboard accessibility

I gave a simple support to keyboard navigation through the use of semantic elements and a small adition to the logic. Users can move around interactive elements, as well as open/close sections with the following that is mostly specified by the browser:

- 'alt' key allows to move across buttons and input elements and 'enter' key is required for buttons. In our UI the results cards require this combination.
- 'arrow' keys allows to switch between different options from a specific field. In our UI this is the case for the filter and sort options (categories and sort type).

My small addition was to allow user to switch focus to the drawer when this one gets opened. If given more time, I would like to bring back focus to the element that opened the drawer after the drawer closes: currently the focus is sent to the end of the cards list.

### Color Theme

In order to provide familiarity and reduce friction to Aescolab users I decided to use shades of #ffb272 and #65792f which are either colors that are prominently used in Aescolab landing page or similar to them.

## Use of AI

I used AI as a complement tool of MDN docs and StackOverflow. Nevertheless, while doing this project, I still browsed those documentation sites as they provide a well structured and trusted information.

I also used AI to give a code review at the end project creation process: their requested changes were minimal and focused mostly with refactoring utility functions.

## What to do next with more time

Many things, but summarizing and in a personal priority order for the current state of the UI:
- More thoughts in the section that displays detailed information of the clinical result. The section above "my notes" input section.
- More thoughts in the filter and sort control sections: try a unified section.
- Handle specific data error scenarios: network types and uncompatible data.
- Component automated tests. The heavier the UI, the less we would like to rely on manual tests.
- Add a details section that provides information to the user about older sample results for the same biomarker.
- Internationalization. Requires also support for automated strings adition and templates.
- Improve keyboard navigation: if a user closes the drawer, the keyboard focus should be brought back to the the item that opened the drawer.

