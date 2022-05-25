import { useState } from "react";

function Landing()
{

    let [averageMonthlySavings, setAverageMonthlySavings] = useState(); 
    let [averageYearlySavings, setAverageYearlySavings] = useState();
    // let [baths, setBaths] = useState();
    // let [beds, setBeds] = useState();
    let [cheaperCity, setCheaperCity] = useState();
    // let [cityOne, setCityOne] = useState();
    // let [cityOneAverageMonthlyPrice, setCityOneAverageMonthlyPrice] = useState();
    // let [cityOneAverageYearlyPrice, setCityOneAverageYearlyPrice] = useState();
    // let [cityTwo, setCityTwo] = useState(); 
    // let [cityTwoAverageMonthlyPrice, setCityTwoAverageMonthlyPrice] = useState();
    // let [cityTwoAverageYearlyPrice, setCityTwoAverageYearlyPrice] = useState();
    let [results, setResults] = useState("No Results available");

    async function compareCities(event)
    {
        event.preventDefault();

        let cityOne = event.target[0].value;
        let cityTwo = event.target[1].value;
        let beds = event.target[2].value;
        let baths = event.target[3].value;

        try{
            const response = await fetch('https://comparison-appx.herokuapp.com/search', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cityOne: cityOne,
                    cityTwo: cityTwo,
                    bath: baths,
                    bed: beds
                })
            });
            const data = await response.json();

                if(data.message){
                    setResults(data.message);    
                }else{
                    setResults("All results"); 
                    setAverageYearlySavings("Average yearly savings: $"+data.AverageYearlySavings)
                    setCheaperCity("Cheaper city: "+data.CheaperCity)
                    setAverageMonthlySavings("Average monthly savings: $"+data.AverageMonthlySavings)
                }

            //setResults(data);

            console.log(data);
        }catch(err){
            console.error(err);
        }
    }

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

                                <div className="col-sm-3">
                                    <input required type="text" className="form-control" name="cityOne" placeholder="City One" aria-label="City From"/>
                                </div>

                                <div className="col-sm-3">
                                    <input required type="text" className="form-control" name="cityTwo" placeholder="City Two" aria-label="City To"/>
                                </div>

                                <div className="col-sm">
                                    <input required type="number" className="form-control" name="beds" placeholder="Total Beds" aria-label="Beds"/>
                                </div>

                                <div className="col-sm">
                                    <input required type="number" className="form-control" name="baths" placeholder="Total Baths" aria-label="Baths"/>
                                </div>

                                <div className="col-sm">
                                    <input type="submit" className="btn btn-dark" value="Submit"/>
                                </div>
                                
                            </div>

                        </form>
                    </div>
                    <div className="col-md-2"></div>
                 </div>
                
                <br />
                <br />
                <div id="results">
                    { results }
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