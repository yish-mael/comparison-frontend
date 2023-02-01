import Footer from '../components/Footer'
import Header from '../components/Header'
import { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import useAuth from '../hooks/useAuth';
import ReviewForm from '../components/authentication/ReviewForm';

function Comparison() {

  const mapContainer = useRef(null);
    const map = useRef(null);
    const [geo1, setGeo1] = useState([-117.985904, 35.125801]);
    const [geo2, setGeo2] = useState([-115.148516, 36.167256]);
    const zoom = 5.5;
    const { auth } = useAuth();
    
    let [averageMonthlySavings, setAverageMonthlySavings] = useState("$0"); 
    let [averageYearlySavings, setAverageYearlySavings] = useState("$0");
    let [cheaperCity, setCheaperCity] = useState("******");
    let [results, setResults] = useState("No results available to be displayed.");
    let [cities, setCities] = useState([]);
    let [cityOne, setCityOne] = useState("");
    let [cityOneGrade, setCityOneGrade] = useState("");
    let [cityTwo, setCityTwo] = useState("");
    let [cityTwoGrade, setCityTwoGrade] = useState("");
    let [safetyTitle, setSafetyTitle] = useState("");
    let [savingTitle, setSavingTitle] = useState("");
    const [submit, setSubmit] = useState("Submit");
    
    async function getCities()
    {
        try{
            
             const cityResponse = await fetch('https://smartrentics.com/api/cities');
            //const cityResponse = await fetch('http://localhost:5001/cities');
            const cityData = await cityResponse.json();
            // console.log(cityData);
            setCities(cityData);
        }catch(err){
            console.log(err);
        }
    }
    
    async function compareCities(event)
    {
        event.preventDefault();
        event.target.elements.submitBtn.disabled = true;
        setSubmit(<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</>)
        cityOne = event.target[0].value;
        cityTwo = event.target[1].value;
        let beds = event.target[2].value;
        let baths = event.target[3].value;
        
        if(baths.indexOf('.') === -1){
            baths += ".0";
        }
        
        try{
             const response = await fetch('https://smartrentics.com/api/search', { 
            //const response = await fetch('http://localhost:5001/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cityOne: cityOne,
                    cityTwo: cityTwo,
                    baths: baths,
                    beds: beds
                })
            });
            
            const responseGeo1 = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+cityOne+', california, usa.json?access_token=pk.eyJ1IjoieWlzaG1hZWwiLCJhIjoiY2w0eWFoczlsMDhrYjNkdWx0dmZydTl1bSJ9.S0jJfE96iZyxxVlIanDmvQ');
            const responseGeo2 = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+cityTwo+', california, usa.json?access_token=pk.eyJ1IjoieWlzaG1hZWwiLCJhIjoiY2w0eWFoczlsMDhrYjNkdWx0dmZydTl1bSJ9.S0jJfE96iZyxxVlIanDmvQ');
            
            const geoData1 = await responseGeo1.json();
            const geoData2 = await responseGeo2.json();
            console.log(geoData1.features[0].center);
            setGeo1(geoData1.features[0].center);
            setGeo2(geoData2.features[0].center);
            
            const data = await response.json();
            console.log(data);
            setResults(""); 
            setAverageYearlySavings("");
            setCheaperCity("");
            setAverageMonthlySavings("");
            setCityOne("");   
            setCityTwo("");
            setCityOneGrade("");
            setCityTwoGrade("");  
            setSavingTitle(""); 
            setSafetyTitle(""); 
            event.target.elements.submitBtn.disabled = false;
            setSubmit("Submit");
            
            if(data?.message || JSON.stringify(data) === '{}'){
                //console.log("here now")
                let msg = data?.message;
                if(msg === "city does not exsist") {
                    msg = "Sorry, we are yet to have the data.";
                    setResults(msg); 
                }else{
                    setResults("Sorry, we are yet to have the data."); 
                }
                
            }else{
               
                if(data?.citySavings?.CheaperCity.split(" ")[1] == "One"){
                    setCheaperCity(data?.citySavings?.CityOne);
                }
                
                if(data?.citySavings?.CheaperCity.split(" ")[1] == "Two"){
                    setCheaperCity(data?.citySavings?.CityTwo);
                }
                
                setResults(""); 
                setSavingTitle("Cost Savings"); 
                setSafetyTitle("Safety Grade"); 
                setAverageYearlySavings("$"+Math.ceil(data?.citySavings?.YearlySavings));
                setAverageMonthlySavings("$"+Math.ceil(data?.citySavings?.MonthlySavings));
                setCityOne(data?.citySavings?.CityOne);
                setCityTwo(data?.citySavings?.CityTwo);
                setCityOneGrade(data?.cityOneSafety?.crime_grade);
                setCityTwoGrade(data?.cityTwoSafety?.crime_grade);
            }
            
        }catch(err){
            event.target.elements.submitBtn.disabled = false;
            setSubmit("Submit");
            console.error(err);
        }
    }
    
    mapboxgl.accessToken = 'pk.eyJ1IjoieWlzaG1hZWwiLCJhIjoiY2w0eWFoczlsMDhrYjNkdWx0dmZydTl1bSJ9.S0jJfE96iZyxxVlIanDmvQ';
    
    useEffect(() => {
        getCities();
        generateMap(map, mapContainer, geo1, geo2, zoom, cityOne, cityTwo);
        
            
    }, [geo1, geo2, zoom, cityOne, cityTwo]);

    async function generateMap(map, mapContainer, geo1, geo2, zoom, cityOne, cityTwo) {

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: geo1,
            zoom: zoom
        });

        map.current.on('load', function () {

            map.current.addLayer({
                id: "route",
                type: "line",
                    source: {
                        type: "geojson",
                        data: {
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "LineString",
                                coordinates: [geo1, geo2 ]
                            }
                        }
                    }
            });

            map.current.fitBounds([geo1,geo2], { padding: 250 });
            
        });

        const popup1 = new mapboxgl.Popup()
        .setText(cityOne.charAt(0).toUpperCase() + cityOne.slice(1)).addTo(map.current);

        const popup2 = new mapboxgl.Popup()
        .setText(cityTwo.charAt(0).toUpperCase() + cityTwo.slice(1)).addTo(map.current);

        new mapboxgl.Marker({ "color": "#BB2D3A" }).setLngLat(geo1).addTo(map.current).setPopup(popup1);
        new mapboxgl.Marker({ "color": "#202A44" }).setLngLat(geo2).addTo(map.current).setPopup(popup2);
    
        return () => map.current.remove();

    }
  return (
    <>
      <Header />

        <div className="container-fluid m-0">
            <div className="container-fluid m-0">
                <div className="row">
                    <div className="col-md-2 m-0">
                        <br /><br /><br />
                        
                        <form className="pb-5" action="" onSubmit={(e)=>{ compareCities(e); }}>

                            <div>
                                <label  className="small text-blue" htmlFor="cityOne"><b>City One: </b></label>
                                <select required className="form-control" name="cityOne">
                                    <option value="">Current City</option>
                                    { cities.map((city, index)=>  (<option value={city} key={index}>{city.charAt(0).toUpperCase() + city.slice(1)}</option>) ) }
                                </select>
                            </div>

                            <hr />

                            <div>
                                <label  className="small text-blue" htmlFor="cityTwo"><b>City Two: </b></label>
                                <select required className="form-control" name="cityTwo">
                                    <option value="">Destination City</option>
                                    { cities.map((city, index)=>  (<option value={city} key={index}>{city.charAt(0).toUpperCase() + city.slice(1)}</option>) ) }
                                </select>
                            </div>

                            <hr />

                            <div className="row">
                                <div className='col'>
                                    <label className="small text-blue" htmlFor="beds"><b>Beds: </b></label>
                                    <input required type="number" className="form-control" name="beds" min="0" placeholder="Beds" aria-label="Beds"/>
                                </div>
                                
                                <div className='col' >
                                    <label className="small text-blue" htmlFor="baths"><b>Baths: </b></label>
                                    <input required type="number" className="form-control" name="baths" min="0" placeholder="Baths" aria-label="Baths" step="0.5"/>
                                </div>
                            </div>

                            <hr />
                            <div className="mt-auto">
                                {/* <input type="submit" className="btn btn-danger rounded-pill px-4" value="Submit"/> */}
                                <button type='submit' name='submitBtn' className='btn btn-danger rounded-pill px-4'>{submit}</button>
                            </div>

                        </form>

                    </div>

                    <div className="col-md-10 p-0 m-0 pr-2">
                        <div ref={mapContainer} className="mapFrame"></div>
                        {/* <iframe title="map-view" className="mapFrame" id="gmap_canvas" src={"https://maps.google.com/maps?q="+CityOne+", ca&t=&z=12&ie=UTF8&iwloc=&output=embed"} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe> */}
                    </div>

                    

                </div>
            </div>

            <div className="cityResult">
                <h5 className="text-blue text-center">Results</h5>
                {
                    auth?.userId
                    ?(
                        <>
                            {
                                (safetyTitle !== "")
                                ?(
                                    <>
                                        <div id="savings">
                                            { results.charAt(0).toUpperCase() + results.slice(1) }
                                        
                                            <b className="text-red">{ savingTitle }</b>
                                            <br />
                                            <small><b>Cheaper City:</b> { cheaperCity }</small>
                                            <br />
                                            <small><b>Average Monthly Savings: </b>{ averageMonthlySavings }</small>
                                            <br />
                                            <small><b>Average Yearly Savings: </b>{ averageMonthlySavings*12 }</small>
                                            <br />
                                            {/* <small>Explore available Apartments</small> 
                                            <br /> */}
                                            <small> <a data-bs-toggle="modal" onMouseOver={(e)=>{e.target.style.cursor='pointer'}} data-bs-target="#review" className="dropdown-item text-danger">Review your current apartment complex.</a></small>
                                        </div>
                                        <br />
                                        <div id="safety" className="">
                                            <b className="text-red">{ safetyTitle }</b>
                                            <br />
                                            <div className="d-flex">
                                                <div>
                                                    <small>{ cityOne.charAt(0).toUpperCase() + cityOne.slice(1) }</small>  
                                                </div>
                                                <div>
                                                    <b className="px-2">{ cityOneGrade }</b>
                                                </div>
                                            </div>
                        
                                            <div className="d-flex">
                                                <div>
                                                    <small>{ cityTwo.charAt(0).toUpperCase() + cityTwo.slice(1) }</small> 
                                                </div>
                                                <div>
                                                    <b className="px-2">{ cityTwoGrade }</b>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </>
                                )
                                :(<>{results}</>)     
                            }
                            
                        </>
                    )
                    :(
                        <>
                            { 
                                (safetyTitle !== "")
                                ?(<>
                                    <div id="savings">
                                        { results.charAt(0).toUpperCase() + results.slice(1) }
                                        
                                        <b className="text-red">{ savingTitle }</b>
                                        <br />
                                        <small><b>Cheaper City:</b> ******</small>
                                        <br />
                                        <small><b>Average Monthly Savings: </b> ******</small>
                                        <br />
                                        <small><b>Average Yearly Savings: </b> ******</small>
                                        <br />
                                        <small><a data-bs-toggle="modal" onMouseOver={(e)=>{e.target.style.cursor='pointer'}} data-bs-target="#loginx" className="dropdown-item text-danger">Sign In to see the price savings.</a></small>
                                    </div>
                                    <br />
                                    <div id="safety" className="">
                                        <b className="text-red">{ safetyTitle }</b>
                                        <br />
                                        <div className="d-flex">
                                            <div>
                                                <small>{ cityOne.charAt(0).toUpperCase() + cityOne.slice(1) }</small>  
                                            </div>
                                            <div>
                                                <b className="px-2">{ cityOneGrade }</b>
                                            </div>
                                        </div>
                    
                                        <div className="d-flex">
                                            <div>
                                                <small>{ cityTwo.charAt(0).toUpperCase() + cityTwo.slice(1) }</small> 
                                            </div>
                                            <div>
                                                <b className="px-2">{ cityTwoGrade }</b>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    </>
                                )
                                :(<>{results}</>)
                            }
                        </>
                    )
                }
                
            </div>
        </div>

        <ReviewForm cityName={cityOne} userId={auth?.userId} />
     
      <Footer />
    </>
  )
}

export default Comparison