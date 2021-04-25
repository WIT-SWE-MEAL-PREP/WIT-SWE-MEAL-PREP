import React from 'react';
import '../Stylings/ConfigStyling.css'

class ConfigPage extends React.Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.props.handleSubmit.bind(this);
    }

    validate = () => {

        this.props.handleSubmit();

    }

    render() {
        return (
            <div className="back">
                <div className="config-wrapper">
                    <form method="post" onSubmit={this.validate} className="config-form">
                        <fieldset>
                            <div className="legend">
                            <legend>User Information</legend>
                            </div>
                            <p className="fieldWrapper">
                                <label>First Name:</label>
                                <input className="configInput" type="string" placeholder="First Name" name="First_Name" id="firstName" required={true} />   
                            </p>
                            <p className="fieldWrapper">
                                <label>Last Name:</label>
                                <input className="configInput" type="string" placeholder="Last Name" name="Last_Name" id="lastName" required={true} />
                            </p>
                            <p className="fieldWrapper">
                                <label>Age:</label>
                                <input className="configInput" type="number" placeholder="Age" name="Age" id="Age" />
                            </p>
                            <p className="fieldWrapper">
                                <label>Weight:</label>
                                <input className="configInput" type="number" placeholder="Lbs" name="Weight" id="Weight" />
                            </p>
                            <p className="fieldWrapper">
                                <label>Height:</label>
                                <input  className="configInput" type="number" placeholder="Inches" name="Height" id="Height" />
                            </p>
                        </fieldset>

                        <br/>

                        <fieldset>
                        <div className="legend">
                            <legend>Nutritional Constraints</legend>
                        </div>
                            <p className="fieldWrapper">
                                <label>Number of meals per day:</label>
                                <input className="configInput" type="number" placeholder="Meals" name="num_meals" id="numMeals" required={true} />
                            </p>

                            <p className="fieldWrapper">
                                <label>Calories per day:</label>
                                <input className="configInput" type="number" placeholder="Calories" name="num_cals" id="calories" required={true} />
                            </p>

                            <p className="fieldWrapper">
                                <label>Grams of protein per day:</label>
                                <input className="configInput" type="number" placeholder="Protein" name="num_protein" id="protein" />
                            </p>

                            <p className="fieldWrapper">
                                <label>Grams of carbs per day:</label>
                                <input className="configInput" type="number" placeholder="Carbs" name="num_carbs" id="carbs" />
                            </p>

                            <p className="fieldWrapper">
                                <label>Grams of fat per day:</label>
                                <input className="configInput" type="number" placeholder="Fat" name="num_fat" id="fat" />
                            </p>

                            <p className="fieldWrapper">
                                <label>Grams of sugar per day:</label>
                                <input className="configInput" type="number" placeholder="Sugar" name="num_sugar" id="sugar" />
                            </p>

                            <p className="fieldWrapper">
                                <label>Grams of fiber per day:</label>
                                <input  className="configInput" type="number"placeholder="Fiber" name="num_fiber" id="fiber" />
                            </p>
                            <br/>
                            <br/>
                            <section className="actions">
                            <div className="submit-button">
                                <button type="submit" className="submit-btn">Submit</button>
                            </div>
                            </section>

                        </fieldset>
                    </form>
                </div>
            </div>)
    }

}
export default ConfigPage;