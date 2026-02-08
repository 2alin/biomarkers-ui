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

## Changes on second iteration (UX/UI focus)

- Improved UI design.
  - We need to transmit calmness to the user, so multiple changes were needed: softer colors, more use of white areas, a more uniform design amongst elements.
- Added Overview section.
  - We want to provide a high overview to the user as soon as possible.
- Made supportive information more explicit.
  - We want to reduce as much as posible cognitive load to the user, so we should be more explicit in our elements. Some elements that changed were: filter order buttons, amount of elements per category as badge, text in 'saved' notes state.
- Increase user trust
  - Although the design improves the user feelings, we also improved the title bar to support such trust: showing a date that indicates when the latest results were taken and reduced the attention of the UI name.
- In main sections, show only information of the latest results taken (filter out old ones). Show old results information in details section.
- Replace 'sort by date' by 'sort by anomality', which is a property that the user may be interested (how close to normal a result is).

## Use case assumptions

- Users are 30-45 year old people that would like to understand their clinical results
- User's language written form is Left-To-Right. This is a temporal assumption due to time constrain.

## UX/UI Decisions

I decided for four charactistics to stay prevelant in the UI:

- Calmness: we don't want users to feel stressed while browsing their result
- Clarity: through well defined layout elements that follow an importance hierarchy.
- Visibility: checking that contrast ratio passes the WCAG Level AA in all our UI and that main and supportive text are not too small.
- Usability: user should be able to navigate without unexpected context jumps.

### UI characteristics for user guidance

As user will naturally navigate content in an "F" shape (initial user assumption), we decided to organize the most important areas in that shape as much as possible.

But as the UI should allow flexibility to the user to inspect content in different levels, we made use of the following charactestics to guide users:

1. Colors: this allows user to see the imporantance of content and the relationship of elements that are not physically close. Helpful for a high overview.
2. Text size and weight: supportive characteristic when the user is consuming information in deeper levels and also supportive to discern text that shouldn't distract (i.e. labels)
3. Card groups: allows user to easily focus on content that share the same context.

### Layout and user navigation experience

I decided to have four main sections that the user will be aware of: Overview, Controls, Results List, Details.

This is how the user will experience navigating through the UI:

1. User will notice the Overview section due to being at the top and colorized elements, but as colors are soft it will still allow user to navigate through another section.
2. User will also notice the result list section as its element have colorized elements (health status badges), but as that section is not the next one, user will inspect the second: Controls.
3. User will check the Controls section and notice all the custom experience that it has at hand, but as this section is the less highlighted of all, user will move on.
4. User will focus on the Result List section and as high overview user will notice the amount of 'normal' / 'anormal' results due to badge colors.
5. As all the clickable elements share the same inital background color (white), user will infer from the control elements, that the card can be clicked.
6. Finally, in the Details section, user will first confirm the correlation between the card they selected and the details as well as the health status, thanks to the colors displayed there. As the Details section share the same level of attention as the Overview and the Result List, user can focus on its content to know more about the result.

As we want all those sections to be available to the user as much as possible, one trade-off that I have is the reduction of vertical space for the result list.

### Use of cards across the UI

To keep clarity across the UI I decided to user cards to define elements and to group elements, as they are versatile structures that remain pleasant to the eye even if the purpose changes.

### UI Colors

We need the following colors: brand colors (primary and secondary, i.e. green and orange), and colors to visualize 'normal' and 'anormal' health states.

In order to satisfy calmness characteristic, I went with soft color shadows for all of them.

For 'normal' health state color, I went with a soft blue as green is already a brand color.

For 'anormal' health state color, I went with 'coral' which is a less vibrant variation of red.

### Details view

I had two options: modal/dialog or drawer.

As we don't want the user to be distracted by too many open/close actions, I went for drawer as it can show always information to the user while they still scrolls through the list, only if the space allows it: in narrow screens, the space is totally taken by the drawer.

## Technical Decisions

### Fetching data and UI loading

For heavy data applications, we should fragmentize the requests of data per component that use it. But for the current use case, the data per user is small.

Fragmentizing requests will add complexities that are not benefitial to the user experience. So I decided to fetch all the needed data at once on UI initialization and hold it in memory so all UI components can use it.

### Biomarker results of different dates

As a user I will be interested on seing the latest results only and only see old ones for comparison purposes.

So, I decided to filter out old results from the main view elements (Overview and Result List sections) and show that information as a sub-section of the Details section.

It would be nice to visually show the user how much they have improved health wise. That can be a secon day feature.

### Sorting type and order

I provided sorting by name as it was suggested, but as a user I find important that I can see the results by "anomality", or how far it is from "normal", so I added that sort type as well.

As a user, I would also like to see such "anomality" displayed in a more visual way, but that could be a second day feature.

### Result cards as buttons

In order to allow the result list cards to be clickable I had two options:

- (easier to implement) Whole card is a button that can be announced to screen readers and interacted by keyboard, but user can't select text.
- (harder to implement) Having an invisibe button inside the card that expands to cover the whole card. Hard to implement as we need to make adjustments to make it accessibel to screen readers and keyboard navigation.

As the card is a visual representation of the information and the information in there is composed of very small units, I decided that a user may not need to select text from there: they can always select any information from the expanded card information drawer.

### Stored notes

We are storing notes per biomarker not per result. This matches user interest and aligns with showing only the latest results per biomarker.

### Keyboard accessibility

I gave a simple support to keyboard navigation through the use of semantic elements and a small adition to the logic. Users can move around interactive elements, as well as open/close sections with the following that is mostly specified by the browser:

- 'alt' key allows to move across buttons and input elements and 'enter' key is required for buttons. In our UI the results cards require this combination.
- 'arrow' keys allows to switch between different options from a specific field. In our UI this is the case for the filter and sort options (categories and sort type).

My small addition was to allow user to switch focus to the drawer when this one gets opened. If given more time, I would like to bring back focus to the element that opened the drawer after the drawer closes: currently the focus is sent to the end of the cards list.

### Color Theme

In order to provide familiarity and reduce friction to Aescolab users I decided to use shades of #ffb272 and #65792f which are either colors that are prominently used in Aescolab landing page or similar to them.

## Use of AI

I used AI in tne following cases:

- A complement tool of MDN docs and StackOverflow. Nevertheless, while doing this project, I still browsed those documentation sites as they provide a well structured and trusted information.

- To give a code review at the end project creation process: their requested changes were minimal and focused mostly with refactoring utility functions.

- To generate multiple mock designs that follow best practices around clarity and usability. This was reinforced with multiple articles that I researched in the web. The design that I ended up with was a combination of all the research I made, mocks that I obtained and my analysis as a user.

## What to do next with more time

- Add visual element(s) to the user that represent how far a result is from being 'normal'.
- More thoughts in the filter and sort control sections: try menus to reduce space needed.
- Handle specific data error scenarios: network types and uncompatible data.
- Component automated tests. The heavier the UI, the less we would like to rely on manual tests.
- Internationalization. Requires also support for automated strings adition and templates.
- Improve keyboard navigation: if a user closes the drawer, the keyboard focus should be brought back to the the item that opened the drawer.
