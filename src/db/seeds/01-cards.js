/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cards').del()
  await knex('cards').insert([
    {card_id: 1, front: '"Differentiate between Real DOM and Virtual DOM."', back: "Virtual DOM updates are faster but do not directly update the HTML",  deck_id: 1},
    {card_id: 2, front: "How do you modify the state of a different React component?", back: "Not at all! State is visible to the component only.",  deck_id: 1},
    {card_id: 3, 
      front: "How do you pass data 'down' to a React child component?",
      back: "As properties or props",
      deck_id: 1
    },
    {
      card_id: 4,
      front: "How do you pass data 'down' to a React child component?",
      back: "As properties or props",
      deck_id: 1
    },
    {
      card_id: 5,
      front: "What path will match the follow Route?\n<Route>\n  <NotFound />\n</Route>",
      back: "All paths. A route with no path matches all URL's",
      deck_id: 2
    },
    {
      card_id: 6,
      front: "What does <Switch> do?",
      back: "Renders the first matching child <Route> ",
      deck_id: 2
    }
  ]);
};