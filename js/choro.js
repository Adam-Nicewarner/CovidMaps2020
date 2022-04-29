        // initialize basemmap
        mapboxgl.accessToken =
            'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/light-v10', // style URL
            zoom: 4, // starting zoom
            center: [-97, 38], // starting center
            projection: 'albers'
        });

        // load data and add as layer
        async function geojsonFetch() {
            let response = await fetch('assets/us-covid-2020-rates.geojson');
            let covidData = await response.json();

            map.on('load', function loadingData() {
                map.addSource('covidData', {
                    type: 'geojson',
                    data: covidData
                });

                map.addLayer({
                    'id': 'covidData-layer',
                    'type': 'fill',
                    'source': 'covidData',
                    'paint': {
                        'fill-color': [
                            'step',
                            ['get', 'rates'],
                            '#FFEDA0',   // stop_output_0
                            30.51,          // stop_input_0
                            '#FED976',   // stop_output_1
                            47.25,          // stop_input_1
                            '#FEB24C',   // stop_output_2
                            61.41,          // stop_input_2
                            '#FD8D3C',   // stop_output_3
                            76.1,         // stop_input_3
                            '#FC4E2A',   // stop_output_4
                            93.15,         // stop_input_4
                            '#E31A1C',   // stop_output_5
                            118.22,         // stop_input_5
                            '#BD0026',   // stop_output_6
                            166.54,        // stop_input_6
                            "#800026"    // stop_output_7
                        ],
                        'fill-outline-color': '#BBBBBB',
                        'fill-opacity': 0.7,
                    }
                });

                const layers = [
                    '0-9',
                    '10-19',
                    '20-49',
                    '50-99',
                    '100-199',
                    '200-499',
                    '500-999',
                    '1000 and more'
                ];
                const colors = [
                    '#FFEDA070',
                    '#FED97670',
                    '#FEB24C70',
                    '#FD8D3C70',
                    '#FC4E2A70',
                    '#E31A1C70',
                    '#BD002670',
                    '#80002670'
                ];

                // create legend
                const legend = document.getElementById('legend');
                legend.innerHTML = "<b>Population Density<br>(people/sq.mi.)</b><br><br>";


                layers.forEach((layer, i) => {
                    const color = colors[i];
                    const item = document.createElement('div');
                    const key = document.createElement('span');
                    key.className = 'legend-key';
                    key.style.backgroundColor = color;

                    const value = document.createElement('span');
                    value.innerHTML = `${layer}`;
                    item.appendChild(key);
                    item.appendChild(value);
                    legend.appendChild(item);
                });
            });
            console.log("thisbit");
            map.on('mousemove', ({point}) => {
              console.log("wow");
              /*
              const state = map.queryRenderedFeatures(point.point, {
                  layers: ['covidData-layer']
              });
              document.getElementById('text-escription').innerHTML = state.length ?
                  `<h3>${state[0].properties.county}</h3><p><strong><em>${state[0].properties.rates}</strong> people per square mile</em></p>` :
                  `<p>Hover over a state!</p>`;
                  */
          });
        }

        geojsonFetch();