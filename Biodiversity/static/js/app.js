let biodiv = []

function fill_panel (sub_id) {
    var panel = d3.select("#sample-metadata");

    current_subj = biodiv.metadata.find(val=>val.id==sub_id);
    d3.select("#subj_id").text("id: " + current_subj.id)
    d3.select("#subj_eth").text("ethnicity: " + current_subj.ethnicity)
    d3.select("#subj_gen").text("gender: " + current_subj.gender)
    d3.select("#subj_age").text("age: " + current_subj.age)
    d3.select("#subj_loc").text("location: " + current_subj.location)
    d3.select("#subj_bbt").text("bbtype: " + current_subj.bbtype)
    d3.select("#subj_wfr").text("wfreq: " + current_subj.wfreq)
   
   

    
    console.log(current_subj);
}




function init() {
    let dropdownSubID = d3.select("#selDataset");
    biodiv.names.map(function(subject) {
        return dropdownSubID.append("option").text(subject).property("value", subject);
        });
}

d3.json("samples.json").then(function(data) {
    console.log(data);
    biodiv = data
    init();
    fill_panel("940");
  });








/*
  let sortedByGreekSearch = data.sort((a, b) => b.greekSearchResults - a.greekSearchResults);

  // Slice the first 10 objects for plotting
  slicedData = sortedByGreekSearch.slice(0, 10);
  
  // Reverse the array to accommodate Plotly's defaults
  reversedData = slicedData.reverse();
  
  // Trace1 for the Greek Data
  let trace1 = {
    x: reversedData.map(object => object.greekSearchResults),
    y: reversedData.map(object => object.greekName),
    text: reversedData.map(object => object.greekName),
    name: "Greek",
    type: "bar",
    orientation: "h"
  };
  
  // Data array
  // `data` has already been defined, so we must choose a new name here:
  let traceData = [trace1];
  
  // Apply a title to the layout
  let layout = {
    title: "Greek gods search results",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };
  
  // Render the plot to the div tag with id "plot"
  // Note that we use `traceData` here, not `data`
  Plotly.newPlot("plot", traceData, layout);
  */
