import React from 'react';
import '../css/homePage.css';
class HomePage extends React.PureComponent{

    render(){


        return(

        <div>

           
                    
            <div className="container-fluid text-center">    
                <div className="row content">
                    <div className="col-lg-10 col-centered"> 
                        <h1>Welcome</h1>
                        <p>This is Test Welcome page for Connected Car</p>
                    </div>
                </div>
            </div>

           

        </div>
        )
    }
}

export default HomePage;