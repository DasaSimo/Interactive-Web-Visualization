let biodiv = []

function fillPanel (sub_id) {
    var panel = d3.select("#sample-metadata");

    current_subj = biodiv.metadata.find(val=>val.id==sub_id);
    d3.select("#subj_id").text("id: " + current_subj.id)
    d3.select("#subj_eth").text("ethnicity: " + current_subj.ethnicity)
    d3.select("#subj_gen").text("gender: " + current_subj.gender)
    d3.select("#subj_age").text("age: " + current_subj.age)
    d3.select("#subj_loc").text("location: " + current_subj.location)
    d3.select("#subj_bbt").text("bbtype: " + current_subj.bbtype)
    d3.select("#subj_wfr").text("wfreq: " + current_subj.wfreq)
      
}

//d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged(value) {
    fillPanel(value);
    reDrawBar(value);
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
    fillPanel("940");
    barGraph();
    
  });

function reDrawBar (value) {
    firstSample = biodiv.samples.find(val=>val.id==value);
    slicedOtuId = firstSample.otu_ids.slice(0,10).reverse();
    slicedSampleVal = firstSample.sample_values.slice(0,10).reverse();
    slicedOtuLabels = firstSample.otu_labels.slice(0,10).reverse();
    
    Plotly.restyle("bar", "x", [slicedSampleVal]);
    Plotly.restyle("bar", "y", [slicedOtuId.map(id => "OTU " + id)]);
    Plotly.restyle("bar", "text", [slicedOtuLabels]);
}

function barGraph () {
    firstSample = biodiv.samples.find(val=>val.id=="940");
    slicedOtuId = firstSample.otu_ids.slice(0,10).reverse();
    slicedSampleVal = firstSample.sample_values.slice(0,10).reverse();
    slicedOtuLabels = firstSample.otu_labels.slice(0,10).reverse();

    let trace1 = {
        x: slicedSampleVal,
        y:  slicedOtuId.map(id => "OTU " + id),
        text: slicedOtuLabels,
        name: "bar",
        type: "bar",
        orientation: "h"
        };
    let traceData = [trace1]; 
    
    let layout = {
        title: "OTUs",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };
    
    Plotly.newPlot("bar", traceData, layout);  
}  
   



