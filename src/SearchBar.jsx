import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedSearchBar extends Component {
  handleQuery = event => {
    this.props.dispatch({ type: "query", query: event.target.value });
  };
  handleQueryLookingFor = event => {
    this.props.dispatch({
      type: "queryLookingFor",
      queryLookingFor: event.target.value
    });
  };
  handleQueryAge = event => {
    this.props.dispatch({
      type: "queryAge",
      queryAge: event.target.value
    });
  };
  handleQuerySex = event => {
    this.props.dispatch({
      type: "queryDogSex",
      queryDogSex: event.target.value
    });
  };
  handleQueryBreed = event => {
    this.props.dispatch({
      type: "queryBreed",
      queryBreed: event.target.value
    });
  };
  handleQueryHeight = event => {
    this.props.dispatch({
      type: "queryHeight",
      queryHeight: event.target.value
    });
  };
  handleQueryWeight = event => {
    this.props.dispatch({
      type: "queryWeight",
      queryWeight: event.target.value
    });
  };
  handleQueryEnergyLevel = event => {
    this.props.dispatch({
      type: "queryEnergyLevel",
      queryEnergyLevel: event.target.value
    });
  };
  render = () => {
    return (
      <div className="container">
        <div className="cell cell-1">
          <input
            className="searchBarInputName"
            type="text"
            placeholder="Dog Name"
            onChange={this.handleQuery}
            value={this.props.query}
          />
        </div>
        <div className="cell cell-2"></div>
        <div className="cell cell-3">
          <input
            className="searchBarInputLookingFor"
            type="text"
            placeholder="Looking For"
            onChange={this.handleQueryLookingFor}
            value={this.props.queryLookingFor}
          />
        </div>
        <div className="cell cell-4">
          <div>
            <select
              className="searchBarInput"
              value={this.props.queryAge}
              onChange={this.handleQueryAge}
            >
              <option value="empty">Age</option>
              <option value="2 to 4 Months">2 to 4 Months</option>
              <option value="5 to 8 Months">5 to 8 Months</option>
              <option value="9 to 12 Months">9 to 12 Months</option>
              <option value="1 Year old">1 Year old</option>
              <option value="2 Years old">2 Years old</option>
              <option value="3 Years old">3 Years old</option>
              <option value="4 Years old">4 Years old</option>
              <option value="5 Years old">5 Years old</option>
              <option value="6 Years old">6 Years old</option>
              <option value="7 Years old">7 Years old</option>
              <option value="8 Years old">8 Years old</option>
              <option value="9 Years old">9 Years old</option>
              <option value="10 Years old">10 Years old</option>
              <option value="11 Years old">11 Years old</option>
              <option value="12 Years old">12 Years old</option>
              <option value="13 Years old">13 Years old</option>
              <option value="14 Years old">+14 Years old</option>
            </select>
          </div>
        </div>
        <div className="cell cell-5">
          <div>
            <select
              className="searchBarInput"
              value={this.props.queryDogSex}
              onChange={this.handleQuerySex}
            >
              <option value="empty"> Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Spayed">Spayed</option>
              <option value="Neutered">Neutered</option>
            </select>
          </div>
        </div>
        <div className="cell cell-6">
          <div>
            <select
              className="searchBarInput"
              value={this.props.queryBreed}
              onChange={this.handleQueryBreed}
            >
              <option value="empty"> Breed </option>
              <option value="Affenpinscher">Affenpinscher</option>
              <option value="Afghan hound">Afghan hound</option>
              <option value="Airedale terrier">Airedale terrier</option>
              <option value="Akita">Akita</option>
              <option value="Alaskan Malamute">Alaskan Malamute</option>
              <option value="American Staffordshire terrier">
                American Staffordshire terrier
              </option>
              <option value="American water spaniel">
                American water spaniel
              </option>
              <option value="Australian cattle dog">
                Australian cattle dog
              </option>
              <option value="Australian shepherd">Australian shepherd</option>
              <option value="Australian terrier">Australian terrier</option>
              <option value="Basenji">Basenji</option>
              <option value="Basset hound">Basset hound</option>
              <option value="Beagle">Beagle</option>
              <option value="Bearded collie">Bearded collie</option>
              <option value="Bedlington terrier">Bedlington terrier</option>
              <option value="Bernese mountain dog">Bernese mountain dog</option>
              <option value="Bichon frise">Bichon frise</option>
              <option value="Black and tan coonhound">
                Black and tan coonhound
              </option>
              <option value="Border collie">Border collie</option>
              <option value="Border terrier">Border terrier</option>
              <option value="Borzoi">Borzoi</option>
              <option value="Boston terrier">Boston terrier</option>
              <option value="Bouvier des Flandres">Bouvier des Flandres</option>
              <option value="Boxer">Boxer</option>
              <option value="Briard">Briard</option>
              <option value="Brittany">Brittany</option>
              <option value="Brussels griffon">Brussels griffon</option>
              <option value="Bull terrier">Bull terrier</option>
              <option value="Bulldog">Bulldog</option>
              <option value="Bullmastiff">Bullmastiff</option>
              <option value="Cairn terrier">Cairn terrier</option>
              <option value="Canaan dog">Canaan dog</option>
              <option value="Chesapeake Bay retriever">
                Chesapeake Bay retriever
              </option>
              <option value="Chihuahua">Chihuahua</option>
              <option value="Chinese crested">Chinese crested</option>
              <option value="Chinese shar-pei">Chinese shar-pei</option>
              <option value="Chow chow">Chow chow</option>
              <option value="Clumber spaniel">Clumber spaniel</option>
              <option value="Cocker spaniel">Cocker spaniel</option>
              <option value="Collie">Collie</option>
              <option value="Corgi">Corgi</option>
              <option value="Curly-coated retriever">
                Curly-coated retriever
              </option>
              <option value="Dachshund">Dachshund</option>
              <option value="Dalmatian">Dalmatian</option>
              <option value="Doberman pinscher">Doberman pinscher</option>
              <option value="English cocker spaniel">
                English cocker spaniel
              </option>
              <option value="English setter">English setter</option>
              <option value="English toy spaniel">English toy spaniel</option>
              <option value="Eskimo dog">Eskimo dog</option>
              <option value="Finnish spitz">Finnish spitz</option>
              <option value="flat-coated retriever">
                Flat-coated retriever
              </option>
              <option value="Fox terrier">Fox terrier</option>
              <option value="Foxhound">Foxhound</option>
              <option value="French bulldog">French bulldog</option>
              <option value="German shepherd">German shepherd</option>
              <option value="German shorthaired pointer">
                German shorthaired pointer
              </option>
              <option value="German wirehaired pointer">
                Germain wirehaired pointer
              </option>
              <option value="Golden retriever">Golden retriever</option>
              <option value="Gordon setter">Gordon setter</option>
              <option value="Great Dane">Great Dane</option>
              <option value="Greyhound">Greyhound</option>
              <option value="Irish setter">Irish setter</option>
              <option value="Irish water spaniel">Irish water spaniel</option>
              <option value="Irish wolfhound">Irish wolfhound</option>
              <option value="Jack Russell terrier">Jack Russell terrier</option>
              <option value="Japanese spaniel">Japanese spaniel</option>
              <option value="Keeshond">Keeshond</option>
              <option value="Kerry blue terrier">Kerry blue terrier</option>
              <option value="Komodor">Komodor</option>
              <option value="Kuvasz">Kuvasz</option>
              <option value="Labrador retriever">Labrador retriever</option>
              <option value="Lakeland terrier">Lakeland terrier</option>
              <option value="Lhasa apso">Lhasa apso</option>
              <option value="Maltese">Maltese</option>
              <option value="Manchester terrier">Manchester terrier</option>
              <option value="Mastiff">Mastiff</option>
              <option value="Mexican hairless">Mexican hairless</option>
              <option value="Newfoundland">Newfoundland</option>
              <option value="Norwegian elkhound">Norwegian elkhound</option>
              <option value="Norwich terrier">Norwich terrier</option>
              <option value="Otterhound">Otterhound</option>
              <option value="Papillon">Papillon</option>
              <option value="Pekingese">Pekingese</option>
              <option value="Pointer">Pointer</option>
              <option value="Pomeranian">Pomeranian</option>
              <option value="Pomsky">Pomsky</option>
              <option value="Poodle">Poodle</option>
              <option value="Pug">Pug</option>
              <option value="Puli">Puli</option>
              <option value="Rhodesian ridgeback">Rhodesian ridgeback</option>
              <option value="Rottweiler">Rottweiler</option>
              <option value="Saint Bernard">Saint Bernard</option>
              <option value="Saluki">Saluki</option>
              <option value="Samoyed">Samoyed</option>
              <option value="Schipperke">Schipperke</option>
              <option value="Schnauzer">Schnauzer</option>
              <option value="Scottish deerhound">Scottish deerhound</option>
              <option value="Scottish terrier">Scottish terrier</option>
              <option value="Sealyham terrier">Sealyham terrier</option>
              <option value="Shetland sheepdog">Shetland sheepdog</option>
              <option value="Shiba Inu">Shiba Inu</option>
              <option value="Shih tzu">Shih tzu</option>
              <option value="Shikoku">Shikoku</option>
              <option value="Siberian husky">Siberian husky</option>
              <option value="Silky terrier">Silky terrier</option>
              <option value="Skye terrier">Skye terrier</option>
              <option value="Staffordshire bull terrier">
                Staffordshire bull terrier
              </option>
              <option value="Soft-coated wheaten terrier">
                Soft-coated wheaten terrier
              </option>
              <option value="Sussex spaniel">Sussex spaniel</option>
              <option value="Spitz">Spitz</option>
              <option value="Tibetan terrier">Tibetan terrier</option>
              <option value="Vizsla">Vizsla</option>
              <option value="Weimaraner">Weimaraner</option>
              <option value="Welsh terrier">Welsh terrier</option>
              <option value="West Highland white terrier">
                West Highland white terrier
              </option>
              <option value="Whippet">Whippet</option>
              <option value="Yorkshire terrier"></option>
            </select>
          </div>
        </div>
        <div className="cell cell-7">
          <div>
            <select
              className="searchBarInput"
              value={this.props.queryWeight}
              onChange={this.handleQueryWeight}
            >
              <option value="empty">Weight</option>
              <option value="0 < 5 lbs"> 0 - 5 lbs</option>
              <option value="5 - 10 lbs"> 5 - 10 lbs</option>
              <option value="10 - 15 lbs"> 10 - 15 lbs</option>
              <option value="15 - 20 lbs"> 15 - 20 lbs</option>
              <option value="20 - 25 lbs"> 20 - 25 lbs</option>
              <option value="25 - 30 lbs"> 25 - 30 lbs</option>
              <option value="30 - 35 lbs"> 30 - 35 lbs</option>
              <option value="35 - 40 lbs"> 35 - 40 lbs</option>
              <option value="40 - 45 lbs"> 40 - 45 lbs</option>
              <option value="45 - 50 lbs"> 45 - 50 lbs</option>
              <option value="50 - 60 lbs"> 50 - 60 lbs</option>
              <option value="60 - 70 lbs"> 60 - 70 lbs</option>
              <option value="70 - 80 lbs"> 70 - 80 lbs</option>
              <option value="80 - 90 lbs"> 80 - 90 lbs</option>
              <option value="90 - 100 lbs"> 90 - 100 lbs</option>
              <option value=" +100 "> +100 lbs</option>
            </select>
          </div>
        </div>
        <div className="cell cell-8">
          <div>
            <select
              className="searchBarInput"
              value={this.props.queryHeight}
              onChange={this.handleQueryHeight}
            >
              <option value="empty">Height</option>
              <option value="0 < 15 cm"> 0 - 15cm</option>
              <option value="15 - 25 cm"> 15 - 25cm</option>
              <option value="25 - 35 cm"> 25 - 35cm</option>
              <option value="35 - 45 cm"> 35 - 45cm</option>
              <option value="45 - 55 cm"> 45 - 55cm</option>
              <option value="55 - 65 cm"> 55 - 65cm</option>
              <option value="65 - 75 cm"> 65 - 75cm</option>
              <option value="75 - 85 cm"> 75 - 85cm</option>
              <option value="85 - 95 cm"> 85 - 95cm</option>
              <option value="95 - 105 cm"> 95 - 105cm</option>
              <option value=" +105cm "> >105cm and up</option>
            </select>
          </div>
        </div>
        <div className="cell cell-9">
          <div>
            <select
              className="searchBarInput"
              value={this.props.queryEnergyLevel}
              onChange={this.handleQueryEnergyLevel}
            >
              <option value="empty"> Energy Level</option>
              <option value="Puppy"> I'm a crazy puppy!</option>
              <option value="Very High"> Very High</option>
              <option value="High"> High</option>
              <option value="Medium"> Medium</option>
              <option value="Low"> Low</option>
              <option value="Very Low"> Very Low</option>
            </select>
          </div>
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    query: state.searchQuery,
    queryLookingFor: state.queryLookingFor,
    queryAge: state.queryAge,
    queryDogSex: state.queryDogSex,
    queryBreed: state.queryBreed,
    queryHeight: state.queryHeight,
    queryWeight: state.queryWeight,
    queryEnergyLevel: state.queryEnergyLevel
  };
};
let SearchBar = connect(mapStateToProps)(UnconnectedSearchBar);
export default SearchBar;
