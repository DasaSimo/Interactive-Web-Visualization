let biodiv = []

d3.json("samples.json").then(function(data) {
    console.log(data);
    biodiv = data
    init();
    fillPanel("940");
    barGraph();
    BubbleGraph("940");
    gaugeBar ("940"); 
});

function init() {
    let dropdownSubID = d3.select("#selDataset");
    biodiv.names.map(function(subject) {
        return dropdownSubID.append("option").text(subject).property("value", subject);
        });
}

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

function optionChanged(value) {
    fillPanel(value);
    reDrawBar(value);
    BubbleGraph(value);
    gaugeBar (value);
}


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


function BubbleGraph (value) {
    firstSample = biodiv.samples.find(val=>val.id==value);
    let trace2 = {
        x: firstSample.otu_ids,
        y: firstSample.sample_values,
        text: firstSample.otu_labels,
        mode: 'markers',
        marker: {
        color: firstSample.otu_ids, 
        colorscale: 'RdBu',
        size: firstSample.sample_values,
        }
    };

  
    let data = [trace2];
  
    let layout = {
    title: 'Biodiversity by Sample',
    showlegend: false,
    height: 600,
    width: 1200
    };
  
  Plotly.newPlot('bubble', data, layout);
}    

function gaugeBar (sub_id) {
    current_subj = biodiv.metadata.find(val=>val.id==sub_id);
    let data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: current_subj.wfreq,
          title: { text: "Scrubs per Week" },
          type: "indicator",
          mode: "gauge+number",
          gauge: { axis: { range: [null, 10] } }
        }
      ];
      
      var layout = { width: 600, height: 400 };
      Plotly.newPlot('gauge', data, layout);
}
