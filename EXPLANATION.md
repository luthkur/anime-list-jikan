# Website Structure

The website has two pages. Home page which have list of anime with a searchbar and pagination in the bottom. The other page is the Anime detail page.

The data fetching is done on SSR on first visit and then on changing pages the data fetching is done on clientside.

For the search and pagination is linked to the queryparam for shareable url and making the search is recorded on browser history. The search is done by entering enter key or pressing the search button is for making sure the request to the api is within its rate limit.

The anime detail page have serveral information layed out in grids.
