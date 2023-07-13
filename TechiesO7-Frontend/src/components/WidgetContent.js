import React from "react";
import "./css/WidgetContent.css";

function WidgetContent() {
  return (
    <div className=" widget__contents">
      <div className="widget__content">
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXwBFRcXHhoeOyEhO3xTRlN8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fP/AABEIAIIArgMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAgMBBAUGB//EAEMQAAEDAgIDCgsGBQUAAAAAAAEAAgMEEQUxEiFxBhMiMjNBgZGxwRQWUVJUYXJzkqHRFTQ1QkRTJENigvAjJbLh8f/EABoBAQACAwEAAAAAAAAAAAAAAAABBAIDBQb/xAAoEQEAAgECBAYDAQEAAAAAAAAAAQIDERIEFDFREyEyM0FhIlJxgSP/2gAMAwEAAhEDEQA/APZoCCMnJu2FBiPi9J7UE0BAQEFUOR6OxBagICAgrHLHp7kFiAgICCubijp7CgmMkGUBAQEEZOTdsKDEXE6T2oJoCAgIK4sj0ILEBAQEFY5boPcgsQEBAQVzcUbe4oJjJBlAQEBBGTiO2FBiLidJ7UE0BAQEFcWRQWICAgIKxy/Qe5BYgICAgrn4nSgmMkGUBAQEEX8R2woMRcTpKCaAgICCuHJ23uQWICAgIKhy52HuQWoCAgIK5+TO0IJjJBlAQEBBF/EdsQYi5MIJoCAgIK4cnbe4ILEBAQEFQ5foPcgtQEBAQVz8kejtQTGSDKAgICDDuKdiCMPJN2IJoCAgIK4cn+0gsQEBAQV/z/7fogsQEBAQVz8kejtQTGSDKAgICDByQQg5FmxBYgICAgrh/P7RQWICAgIK/wCf/agsQEBAQVz8kejtQTGSDKAgICDByQQg5BmxBYgICAgrh/P7RQWICAgIKr/xFv6O9BagICAgrn5F2xBMZIMoCDy0m6icSPEdPHogkC5N1pnJOrpV4GJiJmyPjRU+jxdZUeJLLkK/sk3dJUyvbHvEQLyG30iLX1KYySxtwVa1mdzL8dqaJ5pt5idvXBuHE3SckxOjHHwdb0i2rHjRU+jxdZUeLLZyNf2Si3TSulYJYIwwuAJDjcKYySwvwURWZiXebX0hyqIz0rZvr3UfDt2Z8Npv3mdajxKdzw79lVPWQWk0pWjhm2tJvWPk2W7LvDKb95nWniU7nh37KqjEaeGCSUPDyxpOi06ysq2raYjVjatqxrMOS3dMXfph8f8A0rnK/apzH0n4xk/ph8anlPtHMx2Z+1pbeGeDjQ5O2nz5rDl/z26svH/Ddox4xO9GHxLPlftjzUdkHbpSP0w+NRyv2mOI+nWpsSpp6eOUyNjLxfRc4XCqX0raazLfGSunnKzw6l9Ij+JY769zfXuqqq6nFPIWTRucG6gHZpvr3TvrPysbXUuiLzxj1aSbq9zfXuz4dS+kR/Em6vdG+vdJlVBISI5mOI5g5TFon5TFqz0l8/fx3e0e1VXpK+mHXwjBo8QpXSySvYQ8ts0DyD6rOlN0KnEcTbFbbEN/xYg9Jl6gs/ChX56/aFM25ghv8PU6/I9urrCicXZnXj/2hxammmpJTFOwsd8jsWqYmOq9TJXJG6qpvGG1I6pv6Z/kt+mdwQVVtCpDpMpZ3NBbC+xGaRivPSGPiU7rH09Q8g+D6NhbgttdZXpkv1hjW+Ovyoc1zHFr2lrhmCtMxNZ0ltiYmNYYOSmvqgt0lpYJQR10T3SPe0tIHBsvT5M0000edpii/V0a7CGU1I6aKR7i21w62SjHnm9tsscuCK13Q5Ktqjq0WEMqaVs0sj2l17AWyVTJxE0tthbxYItXWZc7GaKOhbGWPc7SJHCTHmm+urK+KKdEINcER/ob2Lg5/dt/VHL65TWlrbFLBOXtlipzK0G9iNRWylba7qw3Y631i1YQnpp4i58sLmAm+WoJelonWYRkx3id1oUWWtrZabHVcbCsq+Us6zpPk554x2lWZe7jo9XuX/DX+9PYFux9HK433P8AHPxrEKuDE5Y4ah7GANs0HVkFje0xZY4bDjtiiZjzWYRjkzqhkFY4SB50WvtYg811NLzrpLDiOFrFd1Ph0cfpW1GHPfbhw8MHt+SzyRrCvwt9mSI+JeQbxhtVeOrr39E/yW7S8QKtdUq9fAbUsZ8jB2Lo1nSkOZaNby0xi7SORPxKtzUdljlZ7tCol3+d8gGjpW1X9SqZLb7TZax121iqs5KK+qGU9ENyp/0Jdo7F6DP1hwsXSXfZo1ME8TtYu6N3+bCtXnSYmP62eVomHlN5fv8AvH59PQ6b2XV3Rt3OXt/La9S8tpxTwN5+CB6gP/FyvO2tpdPyrpV57dOeBD7R7Fsw/LHL8NWm+6w+7b2BcjP7tv65mb3JdjCaFs155hdgNmtPOfKs8OPX8pWOGwxb8rOhV4jBSODHBznW4reZWL5a08lnJnrjnSSkr4awlrLh1tbXc4SmWt/KE481cnlDl4vQtp3CaIWjcbEDmKr5se38oVOIxbfyjo5l7KurQ0CdZ2q1L3sdHrNzH4Y73ruwLfj9Lk8b7v8Aji7oPxibY3/iFryepd4T2YadIHOq4Gt4xkbbrCwjq3ZJ0pOvZ7XE3huHVRdlvTuxWbdJcPD7lf68M3jN2hVo6u7k9E/yW5S8QKtdUq9hTi9LGPKwD5Lo19MOZb1S1vsmHz5OsLRytG7mruXMwRzvYNYa4jWqV67bTC7Sd1YlA5KK9YTPRDcryEvtDsXoM/WHDxdJdHD59HGK2AnU86Q2jP8Az1Kclf8AlWzClv8AraqXgX+/b9bgaG+f3ZJ4v/HRHh/9dyE8++Y/HGMomEdJFz3JFdMEz3TNtc2nZy90/Eh9orHD8s8vRq033WH3bewLkZ/dt/XNze5L1lA0MoacAZsB6xdXMcaUh08MaY6vNTvMk8j3ZucSufadbTLk3nW0zKdG8x1kLhzOHz1LLHOl4ZYp0vEu9ijA/D5weYX6iruaNaS6WeNccvMOyXPcpoDJWXvnrNzH4Wfeu7ArGPo5HG+7/jUxbB6ysxGSaFrCxwbYl1sgAsb0mZ1buH4nHjxxWzZwnA/A5RPUOa+UcVrcm+vappTTzlq4jivEjbXoq3R4g1sXgcTgXuI3y3MPIoyW+GfB4Z18Sf8AHnG8Zu0LVHWHQyei38lu0vECrWVavXRfdG2/b7l0Y9H+OZPr/wBcMSTWHDk6yuXrfvLp7adoRJNzpXvz3WM6/KY0+GCdSmvWCeiG5XkZfaHYvQZ+sOFi6SxPP4Pjj5fMludnOrVK7sOn0q3ttzavTue1jHSuI0WtuT6hrXOiJmdF+ZiI1eYw2QzYuJHZv03HpC6GeNMWijhnXJqjun5OL2iquH5WsvRq0v3WH3bewLkZ/dt/XNze5L1WGyiShhIOtrdE9Ct4Z1pDo4LRbHDgV8Dqaqe1w4JcS0+UKlkrNbTq52ak0tOqeGwOnq2WHBYdJx8inFXdaGWCk2vDr4xKI6B4/M8ho71bz20pK7xFtMc/bzbslz3Mc8ZBWnvnWw3Gjh9LvIgEnCLrl1s1srfbGipm4bxbbtW0d1MnNSM6Xn6LLxfpp5GP2atTuhrZ26LC2Bpz0Br6ysZyTLbTg8dfOfNyi65JJuTrN1rXNGY9b228oUx1YZPRP8dGBtgFVsrRD0MOJU7ImNJfcAA8FXI4jHEaKNuHvMzKz7Vp/Of8KnmcaOWu5tdO2oqN8ZfR0QNYVPNeL21hbw0mldJa+a119UNk9GjS0WKUrbRwVEd89EZr1G7FPV52a5I6LH0la95dJTzuc7Mlh1rbGTHEaRLROPJM6zC1xxMxb05tVvZFtHQNrLGPB118kz42mnmoZFWQPD4oZ2PGREZ+iytbHaNJmEVres6xDXrfDqho39k7wNYvGfotOmOPTo363n1LomlkMbHAtc1jQQRYg2XAz+7b+qeb3Jb1BXOo5DcF0buM3vCY8k0n6ZYc045+nbbV0dSwXkjI819hbrVyL0t8uhGTHeOqL62jpmECSO3mx2N+pJyUrCJy46R1cKurH1kukeCxuprfIqWTJN5c/LlnJOrVK1NT07sAw1zy80wuTfU9wHVddPZV6KOJyxGm5MYHhrcqRnSSVOyvZHMZf2SGD4eP0cXS1NsdkePl/aUhhdADcUcAPsBNsdkeNk/aUxQUgypovgCnSEb7d1FXg9LUlh0d7LfMAF1jbHFuqa5bVVNwKBuUknyWrl6NnM3S+xoPPk+SjlqJ5m7P2NB58nWE5ahzNz7Gg8+TrCctQ5m6TcHp2uBLnmxvYnNTHD0idUTxF5jRvqwriAgIFkHFqsDfLUySsmaA9xdYjK6rXwbra6qmTht9ptqq8X5f32dRWPLT3a+Tn9jxel56hnwlOW+08p9ni9J6Qz4SnLfZyn2eLsnpLfgP1Tlvs5T7SbudN+HUAj1NTlvtPKfbvK2uiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD//2Q=="
          alt="demo"
        />
        <div className="widget__contentTitle">
          <h5>Mobile App Programmer</h5>
          <p>The best Mobile App Development Company</p>
        </div>
      </div>
    </div>
  );
}

export default WidgetContent;