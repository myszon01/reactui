import React from 'react';
import Cars from './Components/Cars'
import Modal from 'react-responsive-modal';
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';


class OEM extends React.PureComponent {
    constructor(props){
        super(props)
        
        this.openCreateModal = this.openCreateModal.bind(this)
        this.createCar = this.createCar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getSuggestions = this.getSuggestions.bind(this)
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
        this.getSuggestionEmail = this.getSuggestionEmail.bind(this)
        this.renderSuggestion = this.renderSuggestion.bind(this)
        this.handleChangeDevice = this.handleChangeDevice.bind(this)
       
        this.state = { openCreateModal: false, device: '',deviceAddress: '', 
                        vin: '', model: '', mark: '', suggestions: [], 
                        deviceValidation: {value: 'device', isValid: true, message: ''},
                        modelValidation: {value: 'model', isValid: true, message:''},
                        markValidation: {value: 'mark', isValid: true, message:''},
                        vinValidation: {value: 'vin', isValid: true, message:''}
                        }
    }

    
      componentDidMount(){
        this.props.showWorkgflows(3)
      }


        openCreateModal(e) {
            if(this.state.openCreateModal){
                this.setState({ openCreateModal: false, device: '',deviceAddress: '', 
                        vin: '', model: '', mark: '', suggestions: [], 
                            deviceValidation: {value: 'device', isValid: true, message: ''},
                            markValidation: {value: 'mark', isValid: true, message:''},
                            modelValidation: {value: 'model', isValid: true, message:''},
                            vinValidation: {value: 'vin', isValid: true, message:''}
                        })

            }else{
                this.setState({ openCreateModal: true })
            }
            };

        //construct json object and call parent function to create smart contract   
        //and validate 
        createCar(e){
            e.preventDefault(); 
            
            const body = {
                            "workflowFunctionID": this.props.state.app.constructorId,
                            "workflowActionParameters": [
                            {
                                "name": "device",
                                //"value": "0xe14ebf4b7def3d997890271cc6987f435b4c5dfc"
                                "value": this.state.deviceAddress
                            },
                            {
                                "name": "vin",
                                "value":this.state.vin
                            },
                            {
                                "name": "mark",
                                "value": this.state.mark
                            },
                            {
                                "name": "model",
                                "value": this.state.model
                            }
                            ]
                        }
            let isFormOK = true
            let state = this.state
            if (this.state.deviceAddress === ''){
                state.deviceValidation.isValid = false
                state.deviceValidation.message = "Pick a device"
                isFormOK = false
                
            }
            if(this.state.vin === ''){
                state.vinValidation.isValid = false
                state.vinValidation.message = "VIN # cannot be empty"
                isFormOK = false
            }
            if(this.state.model === ''){
                state.markValidation.isValid = false
                state.markValidation.message = "Mark have to be specify"
                isFormOK = false
            }
            if(this.state.mark === ''){
                state.modelValidation.isValid = false
                state.modelValidation.message = "Cannot be empty"
                
                isFormOK = false
            }
            if(!isFormOK) {this.setState({state}); return}

            //this.props.createCar(body)
            console.log(JSON.stringify(body))   
            this.openCreateModal()  
        }

        //suggestions inpput for device 
        getSuggestions (value){
           
            const inputValue = value
            const inputLength = inputValue.length;
           
            return inputLength === 0 ? [] : this.props.state.usersDeviceAddress.filter(elm =>
                elm.user.emailAddress.toLowerCase().slice(0, inputLength) === inputValue
            );
          };
         renderSuggestion(suggestion) {
            return (
              <div>{suggestion.user.emailAddress}</div>
            );
          }

        handleChange(event) {
            const state = this.state
            //reset validation 
            Object.keys(state).map(key => {
                if (state[key].hasOwnProperty('isValid')) {
                    if(state[key].value === event.target.name){
                        state[key].isValid = true;
                        state[key].message = '';
                    }
                }
            });
            this.setState({
                [event.target.name]: event.target.value,
            });
          }
        
        handleChangeDevice(event, val) {
            const usr = this.props.state.usersDeviceAddress.find(el =>{
               return el.id.toString() === val.newValue
            })
            console.log(usr)
            if(typeof usr ==='undefined'){
                let state = this.state
                state.device = val.newValue
                state.deviceAddress = ''
                state.deviceValidation.isValid = true
                state.deviceValidation.message = ''
                this.setState({state
                });
            }else{
                this.setState({
                    device: usr.user.emailAddress,
                    deviceAddress: usr.user.userChainMappings[0].chainIdentifier
                });
            }
           
          }
        
          
        // Autosuggest will call this function every time you need to update suggestions.
        // You already implemented this logic above, so just use it.
        onSuggestionsFetchRequested(value) {
            this.setState({
                suggestions: this.getSuggestions(value.value)
            });
        }
        
        // Autosuggest will call this function every time you need to clear suggestions.
        onSuggestionsClearRequested () {
            this.setState({
                suggestions: []
            });
        }
        getSuggestionEmail(suggestion) {
           return suggestion.id.toString()
          }
        

      render() {
        const skipContracts = []
        
        this.props.state.workList.forEach((con, k) =>{
            if(con.contractProperties.length > 0){
                (con.contractProperties[2].value === '' || 
                    con.contractProperties[2].value2 
                        === this.props.state.appUserMe.currentUser.userChainMappings[0].chainIdentifier)?console.log():skipContracts.push(k)
                }
        })
        const inputProps = {
            value: this.state.device,
            onChange: this.handleChangeDevice,
            className: "form-control"
        }
        const deviceGroupClass = classNames('form-group', {'has-error': !this.state.deviceValidation.isValid},'row');
        const markGroupClass = classNames('form-group', {'has-error': !this.state.markValidation.isValid},'row');
        const modelGroupClass = classNames('form-group', {'has-error': !this.state.modelValidation.isValid},'row')
        const vinGroupClass = classNames('form-group', {'has-error': !this.state.vinValidation.isValid},'row')
        return(
            <div>
                <button onClick={this.openCreateModal}>Create a car</button>
                <div className="col-lg-12" style ={{overflowX: 'auto'}}>
                    <Cars stateIDs = {[0]} state = {this.props.state} colIndex={[0,2,3,4,5,6,7]} skipContracts ={skipContracts}  />  
                </div> 
                <Modal open={this.state.openCreateModal} onClose={this.openCreateModal} center>
                    <form onSubmit={this.createCar}>
                    <div className="form-group row">
                        <div className="col-sm-12 col-centered">
                            <h3>Create a new car</h3>
                        </div>
                    </div>
                    <div className={deviceGroupClass}>
                        <label className="col-sm-5 col-form-label ">Raspberry Pi:</label>
                        <div className="col-sm-7">   
                            <Autosuggest    suggestions={this.state.suggestions}
                                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                            getSuggestionValue={this.getSuggestionEmail}
                                            renderSuggestion={this.renderSuggestion}
                                            inputProps={inputProps}/>
                            <span className="help-block">{this.state.deviceValidation.message}</span>  
                        </div>
                    </div>
                    <div className={vinGroupClass}>
                        <label className="col-sm-5 col-form-label">VIN#:</label>
                            <div className="col-sm-7"> 
                                <input type="text" className="form-control" name="vin" value={this.state.vin} onChange={this.handleChange} />
                                <span className="help-block">{this.state.vinValidation.message}</span> 
                            </div>
                        </div>
                    <div className={markGroupClass}>
                        <label className="col-sm-5 col-form-label">Mark of the car:</label>
                        <div className="col-sm-7"> 
                            <input type="text" className="form-control" name="mark" value={this.state.mark} onChange={this.handleChange}></input>
                            <span className="help-block">{this.state.markValidation.message}</span> 
                        </div>
                    </div>
                    <div className={modelGroupClass}>
                        <label className="col-sm-5 col-form-label">Model of the car:</label>
                            <div className="col-sm-7"> 
                                <input type="text" className="form-control" name="model" value={this.state.model} onChange={this.handleChange}></input>
                                <span className="help-block">{this.state.modelValidation.message}</span> 
                            </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-3 col-centered">
                            <input type="submit" value="Submit" />
                        </div>
                    </div>
                    </form>
                </Modal>     
            </div>
        )
      }




}

export default OEM;