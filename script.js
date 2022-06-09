var psiData ={};
fetch('https://api.data.gov.sg/v1/environment/psi')
    
    // get API response
    .then(response => response.json())
    
    // get parking data and remove unecessarry info elements
    .then(data => psiData = data.items[0])
    
    // for console log debugging
    .then(test => console.log(psiData))
    
    // create timestamp
    .then(generateTimestamp => {
        let timestamp = new Date(psiData.timestamp);
        $("#psiTimestamp").append(
            "<strong>Retrieved at:</strong> " + timestamp.toLocaleString()
        );
    })
    
    // create table header
    .then(generateTableHeader => {
        $("#psiTable").append(
            "<tr>",
                "<th>Metric</th>",
                "<th>National</th>",
                "<th>Central</th>",
                "<th>North</th>",
                "<th>South</th>",
                "<th>East</th>",
                "<th>West</th>",
            "</tr>",
        );
    })
    
    // create table content from psi data
    .then(generateTableContent => {
        $.each(psiData.readings, function(index, reading) {
            $("#psiTable").append(
                "<tr>",
                    "<td>" + index + "</td>",
                    "<td>" + reading.national + "</td>",
                    "<td>" + reading.central + "</td>",
                    "<td>" + reading.north + "</td>",
                    "<td>" + reading.south + "</td>",
                    "<td>" + reading.east + "</td>",
                    "<td>" + reading.west + "</td>",
                "</tr>"
            )
        });
    })
    
    // for error catching
    .catch(error => {
        console.log(error);
    });