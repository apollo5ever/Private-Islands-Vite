# Dero Private Islands

Fund raising, bounties, & subscriptions are the initial features available on Private Islands

This is a vite react front end app, utilizing many other software implementations, but interfacing the the Dero L1 always private blockchain

### Dev Notes

- MST Sep 13, 2023

  - Styling Update
    - Created a theme using tailwind & a tailwid component library called daisyui
    - Stepping thru the site to convert styling over to using this paradigm of a combination of styled components & tailwind inline css, moving away from App.css classes
    - At this stage just converting existing html/jsx without much change and little to no code refactoring 
    
   - New Design 
     - A new design is being sought from a 3rd party with the goal of getting a figma documented design, from scratch, to give the site a new, fun, & professional look
     - The concept being with this new design definition, we will utilize some of the exsting components and the styled component/tailwind tools to implement the new design

  - TO DO - Taks List

    - Improve the wallet modal for integrated wallets
      - hide pwd & actions until a wallet address is selected from a drop down list of wallets

    - Add modal with txn information so a user knows what's happening when they 'subscribe' to a subscription service
      - present a confirmation modal when someone subscribes, or perhaps just show them in a modal the txn has initiated
      - for integrated wallet txns, get status info from useSendTransaction to keep the user upated on the txn process & results
