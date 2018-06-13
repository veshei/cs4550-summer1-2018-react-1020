import React from 'react';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';


const AccountSideBar= () => {
    return (
        <div className="wrapper" style={{ width:'75%'}}>
            <nav id="sidebar" >
                <div className="sidebar-header">
                    <h3>Sidebar</h3>
                </div>

                <img src="https://image.freepik.com/free-icon/user-image-with-black-background_318-34564.jpg"
                     style={{width:'100px',height:'100x',margin:'20%',
                     boxShadow:'5px 5px 5px 5px'}}/>
                Sample User
                <ul style={{padding:"0px"}}>
                    <li className="list-group-item items">Home</li>
                    <li className="list-group-item items">Home1</li>
                    <li className="list-group-item items">Home2</li>
                    <li className="list-group-item items">Home3</li>

                </ul>
            </nav>

        </div>)
};


export default AccountSideBar
