import React from 'react';


//returns Cars with state passed as stateIDs 
//pass states id as stateIDs and state of parent component 
const Cars = (props) =>{
    const incldRows = []
    const skipCols = []
    var actionRow 
    var actionCol 
    if(typeof props.onClick === "function"){
        actionCol = <th>Actions</th>
        actionRow = <td><button onClick={props.onClick}>Actions</button></td>
    }
    return(
    <table className="table">
            <thead>
            <tr className="thead-dark">
                <th>ID</th>
               {props.state.appLabels.map((r, k) => {
                    //adds +1 to the index becouse when 0 it doesn't read
                if ( props.colIndex.indexOf(k)> -1) skipCols.push(k+1)
                return (<th className="thead-dark" key={k}>
                         {r.displayName}
                       </th>)
                }).filter((o, k) => (skipCols.find(sk => k+1 === sk)))}
                {actionCol}
             </tr>
            </thead>
            <tbody>{  
                props.state.workList.map((r, k) => {
                    return ( 
                            
                            <tr key={k}>
                                <td><a>{r.id}</a></td>
                                {r.contractProperties.map((t,y) =>{
                                    
                                    //if ( parseInt(r.id) === 12 ) incldRows.push(k.toString())
                                    
                                    //check if it state property 
                                    if (y===0){
                                        //check if this state has to be shown
                                        if ( props.stateIDs.indexOf(parseInt(t.value.trim())) > -1 ) incldRows.push(k.toString())
                                        
                                        //check if include state column on table table
                                        if ( props.colIndex.indexOf(parseInt(y))> -1){ 
                                            return (<td key={y}>{props.state.appStates[t.value].displayName}</td>)
                                        }
                                    }else {
                                        //check if include column on the table
                                        if ( props.colIndex.indexOf(parseInt(y))> -1){ 
                                            return (<td key={y}>{t.value}</td>)
                                        }
                                    }
                                    return null
                                })} 
                                {actionRow}
                            </tr>
                            )
                }).filter((o, k) => {
                    const test = incldRows.filter(sk => {
                        const exist = props.skipContracts.findIndex(sc => {
                            return k === sc
                        })
                       
                        return  exist <0
                    })
                    return test.find(sk => k.toString() === sk)
                    })}
            </tbody>
    </table>)
}
        
export default Cars;