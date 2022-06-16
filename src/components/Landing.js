import { useState, useEffect } from "react";

function Landing()
{

    let [averageMonthlySavings, setAverageMonthlySavings] = useState(); 
    let [averageYearlySavings, setAverageYearlySavings] = useState();
    let [cheaperCity, setCheaperCity] = useState();
    let [results, setResults] = useState("No Results available");
    let [cities, setCities] = useState([]);

    async function getCities()
    {
        try{

            const cityResponse = await fetch('https://comparison-appx.herokuapp.com/cities');
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

        let cityOne = event.target[0].value;
        let cityTwo = event.target[1].value;
        let beds = event.target[2].value;
        let baths = event.target[3].value;

        if(baths.indexOf('.') === -1){
            baths += ".0";
        }
        //console.log(baths.indexOf('.'));

        try{
            const response = await fetch('https://comparison-appx.herokuapp.com/search', {
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
            const data = await response.json();

                if(data.message){
                    let msg = data.message;
                    if(msg === "city does not exsist") {
                        msg = "Sorry, we are yet to have the data.";
                    }
                    setResults(msg); 
                    setAverageYearlySavings("");
                    setCheaperCity("");
                    setAverageMonthlySavings("");   
                }else{
                    setResults("All results"); 
                    setAverageYearlySavings("Average yearly savings: $"+data.AverageYearlySavings)
                    setCheaperCity("Cheaper city: "+data.CheaperCity)
                    setAverageMonthlySavings("Average monthly savings: $"+data.AverageMonthlySavings)
                }

            //console.log(data);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        getCities();
    }, []);

    return(
        <div className="container pt-5 text-center">
            <h1>Hi there!</h1>
                <br />
                <br />
                   <h4>Are you looking to relocate?</h4> 
                <p className="text-center">
                   Would you like to see what you would be saving?
                </p>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <form action="" onSubmit={(e)=>{ compareCities(e); }}>

                            <div className="row g-3">

                                <div className="col-sm text-start">
                                    <label htmlFor="cityOne"><b>City One:</b></label>
                                    <select required className="form-control" name="cityOne">
                                        <option value="">select</option>
                                       { cities.map((city, index)=>  (<option value={city} key={index}>{city.charAt(0).toUpperCase() + city.slice(1)}</option>) ) }
                                    </select>
                                </div>

                                <div className="col-sm text-start">
                                    <label htmlFor="cityTwo"><b>City Two:</b></label>
                                    <select required className="form-control" name="cityTwo">
                                        <option value="">select</option>
                                       { cities.map((city, index)=>  (<option value={city} key={index}>{city.charAt(0).toUpperCase() + city.slice(1)}</option>) ) }
                                    </select>
                                </div>

                                <div className="col-sm text-start">
                                    <label htmlFor="beds"><b>Beds:</b></label>
                                    <input required type="number" className="form-control" name="beds" min="0" placeholder="Total Beds" aria-label="Beds"/>
                                </div>

                                <div className="col-sm text-start">
                                    <label htmlFor="baths"><b>Baths:</b></label>
                                    <input required type="number" className="form-control" name="baths" min="0" placeholder="Total Baths" aria-label="Baths" step="0.5"/>
                                </div>

                                <div className="col-sm mt-auto">
                                    <input type="submit" className="btn btn-dark " value="Submit"/>
                                </div>
                                
                            </div>

                        </form>
                    </div>
                    <div className="col-md-2"></div>
                 </div>

                <br />
                 {/* <div className="row">
                    <div className="col-md-1"></div>

                    <div className="col-md-2">
                        <label htmlFor="pets_friendly">Pets Friendly</label>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="laundry_options">Laundry Options</label>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="parking_options">Parking Options</label>
                    </div>

                    <div className="col-md-2">
                        <label htmlFor="parking_options">Smoking Allowed</label>
                    </div>

                    <div className="col-md-2">
                        <label htmlFor="parking_options">Funished</label>
                    </div>
                    
                    <div className="col-md-1"></div>
                 </div> */}
                
                <br />
                <br />
                <div id="results">
                    { results.charAt(0).toUpperCase() + results.slice(1) }
                    <br />
                    <b>{ cheaperCity }</b>
                    <br />
                    <b>{ averageMonthlySavings }</b>
                    <br />
                    <b>{ averageYearlySavings }</b>
                </div>
        </div>
    );
}

export default Landing;