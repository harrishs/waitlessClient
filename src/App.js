import React from "react";

import Layout from "./MainComponents/Layout/Layout";
import MenuEditor from "./RestaurantComponents/MenuEditor/MenuEditor";

function App() {
  return (
    <div className="App">
      <Layout>
        <MenuEditor />
      </Layout>
    </div>
  );
}

export default App;
