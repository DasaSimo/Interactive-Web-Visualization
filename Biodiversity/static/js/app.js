function init() {
    let dropdownSubID = d3.select("#selDataset");
    biodiv.names.map(function(subject) {
        return dropdownSubID.append("option").text(subject).property("value", subject);
        });
}

let biodiv = []
d3.json("samples.json").then(function(data) {
    console.log(data);
    biodiv = data
    init();
  });


  