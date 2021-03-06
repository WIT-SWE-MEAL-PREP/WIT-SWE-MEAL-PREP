import React from 'react';
import { Link } from 'react-router-dom';
import '../Stylings/ConfigStyling.css'


class ConfigPage extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            firstName: this.props.userConfig[0].First_Name,
            lastName: this.props.userConfig[0].Last_Name,
            age: this.props.userConfig[0].Age,
            weight: this.props.userConfig[0].Weight,
            height: this.props.userConfig[0].Height,
            userId: this.props.userId,
            constraints: {
                numMeals: this.props.userConfig[0].Num_Meals,
                calories: this.props.userConfig[0].Calories,
                protein: this.props.userConfig[0].Protein,
                carbs: this.props.userConfig[0].Carbs,
                fat: this.props.userConfig[0].Fat,
                sugar: this.props.userConfig[0].Sugar,
                fiber: this.props.userConfig[0].Fiber,
            }
        }

        console.log(this.props.userConfig)
        console.log(this.state)
        console.log(this.state.firstName)
    }


    validate(e) {  
        e.preventDefault();
        
        this.props.handleSubmit(true);
    }

    render() {
        return (
            <div className="back">
                <div className="config-wrapper">
                    <form method="post" onSubmit={e => this.validate(e)} className="config-form">
                        <fieldset>
                            <div className="legend">
                            <legend>User Information</legend>
                            </div>
                            <p className="fieldWrapper">
                                <label>First Name:<label className="required">*</label></label>
                                <input defaultValue={this.state.firstName} className="configInput" type="string" placeholder="First Name" name="First_Name" id="firstName" required={true} />   
                            </p>
                            <p className="fieldWrapper">
                                <label>Last Name:<label className="required">*</label></label>
                                <input defaultValue={this.state.lastName} className="configInput" type="string" placeholder="Last Name" name="Last_Name" id="lastName" required={true} />
                            </p>
                            <p className="fieldWrapper">
                                <label>Age:</label>
                                <input defaultValue={this.state.age} className="configInput" type="number" placeholder="Age" name="Age" id="Age" />
                            </p>
                            <p className="fieldWrapper">
                                <label>Weight:</label>
                                <input defaultValue={this.state.weight} className="configInput" type="number" placeholder="Lbs" name="Weight" id="Weight" />
                            </p>
                            <p className="fieldWrapper">
                                <label>Height:</label>
                                <input defaultValue={this.state.height} className="configInput" type="number" placeholder="Inches" name="Height" id="Height" />
                            </p>
                        </fieldset>

                        <br/>

                        <fieldset>
                        <div className="legend">
                            <legend>Nutritional Constraints</legend>
                        </div>
                            <p className="fieldWrapper">
                                <label>Number of meals per day:<label className="required">*</label></label>
                                <input defaultValue={this.state.constraints.numMeals} className="configInput" type="number" placeholder="Meals" name="num_meals" id="numMeals" required={true} />
                            </p>

                            <p className="fieldWrapper">
                                <label>Calories per day:<label className="required">*</label></label>
                                <input defaultValue={this.state.constraints.calories} className="configInput" type="number" placeholder="Calories" name="num_cals" id="calories" required={true} />
                            </p>

                            <p className="fieldWrapper">
                                <label>Grams of protein per day:</label>
                                <input defaultValue={this.state.constraints.protein} className="configInput" type="number" placeholder="Protein" name="num_protein" id="protein" />
                            </p>

                            <p className="fieldWrapper">
                                <label>Grams of carbs per day:</label>
                                <input defaultValue={this.state.constraints.carbs} className="configInput" type="number" placeholder="Carbs" name="num_carbs" id="carbs" />
                            </p>

                            <p className="fieldWrapper">
                                <label>Grams of fat per day:</label>
                                <input defaultValue={this.state.constraints.fat} className="configInput" type="number" placeholder="Fat" name="num_fat" id="fat" />
                            </p>

                            <p className="fieldWrapper">
                                <label>Grams of sugar per day:</label>
                                <input defaultValue={this.state.constraints.sugar} className="configInput" type="number" placeholder="Sugar" name="num_sugar" id="sugar" />
                            </p>

                            <p className="fieldWrapper">
                                <label>Grams of fiber per day:</label>
                                <input defaultValue={this.state.constraints.fiber} className="configInput" type="number"placeholder="Fiber" name="num_fiber" id="fiber" />
                            </p>
                            <br/>
                            <br/>
                            <section className="actions">
                            <div className="submit-button">
                                <Link to="/" className="btn">
                                    <button type="submit" className="btn">Cancel</button>
                                </Link> 
                                <div className="btn">
                                    <button type="submit" className="btn" >Submit</button>
                                </div>
                            </div>
                            </section>
                        </fieldset>
                    </form>
                </div>
            </div>)
    }

}
export default ConfigPage;