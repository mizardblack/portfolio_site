let Airtable = require('airtable');

let base = new Airtable({apiKey: 'keyfpZwKVsD8rJeMF'}).base('appEix67CO2YQY2rP');

let fetchRecord = function(slug) {
  if (!slug) {
    console.log('No slug provided, cancelling API call');
    return;
  }

  let formula = `Slug="${slug}"`;

  let title = document.querySelector('.dynamic-title');
  let description = document.querySelector('.dynamic-description');
  let process = document.querySelector('.dynamic-process');
  let created_year = document.querySelector('.dynamic-year');
  let media = document.querySelector('.dynamic-meida');
  let role = document.querySelector('.dynamic-role');
  let credits = document.querySelector('.dynamic-credits');

  base('Main').select({
    filterByFormula: formula,
    maxRecords: 1,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
        title.innerHTML = record.fields.Title;
        description.innerHTML = record.fields.Description;
        process.innerHTML = record.fields.Process;
        created_year.innerHTML = new Date (record.fields.Created_date).getFullYear();//convret Date to year
        
        let media_data= record.fields.Media;
        console.log(`media: ${media_data}`);
        // media.innerHTML = media_data[0];
        //parse a array of strings to one string
        role.innerHTML = record.get('Role');
        credits.innerHTML = record.fields.Credits;
    });
  }, function done(err) {
    if (err) { console.error(err); return; }
  });
}

let makeNavigation = function() {
  let navigationContainer = document.querySelector('.dynamic-navigation');

  base('Main').select({
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      let listItem = document.createElement('li');
      let anchor = document.createElement('a');

      let link = 'case_study.html?' + record.fields.Slug;

      anchor.innerHTML = link;
      anchor.setAttribute('href', link);

      listItem.appendChild(anchor);

      navigationContainer.appendChild(listItem);

    });
  }, function done(err) {
    if (err) { console.error(err); return; }
  });
}


document.addEventListener('DOMContentLoaded', function (event) {
  // DOM Loaded!
  let searchParam = document.location.search;

  let slug = searchParam.substring(1);

  fetchRecord(slug);

  makeNavigation()
});