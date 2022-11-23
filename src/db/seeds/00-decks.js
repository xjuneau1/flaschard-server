/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


exports.seed = async function(knex) {
  await knex('decks').del()
  await knex('decks').insert([
    {
      deck_id: 1,
      name: "Rendering in React",
      description: "React's component structure allows for quickly building a complex web application that relies on DOM manipulation. "
    },
    {
      deck_id: 2,
      name: "React Router",
      description: "React Router is a collection of navigational components that compose declaratively with your application."
    }
  ])
};
