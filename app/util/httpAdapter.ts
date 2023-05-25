class httpAdapter {

    async get<TResponse>(url: string) {

      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'API-Key': process.env.NEXT_PUBLIC_DATA_API_KEY
        },
      });
    
      const data = await res.json() as TResponse;
     
      return data as TResponse;

        // const response = await fetch(url);
        // const data = await response.json();
        // return data as TResponse;

    }
  
    async post<TResponse>(url: string, data: any) {

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'API-Key': process.env.NEXT_PUBLIC_DATA_API_KEY
        },
  
        body: JSON.stringify(data)
      });
    
      const responseData = await response.json();
      return responseData as TResponse;
    }
  
    async put<TResponse>(url: string, data: any) {

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'API-Key': process.env.NEXT_PUBLIC_DATA_API_KEY
        },
  
        body: JSON.stringify(data)
      });
      
      const responseData = await response.json();
      return responseData as TResponse;
    }
  
    async delete<TResponse>(url: string) {
        const response = await fetch(
        url,{
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'API-Key': process.env.NEXT_PUBLIC_DATA_API_KEY
          }    
        }
        );

      const responseData = await response.json();
      return responseData as TResponse;
    }
  }
  
  export default new httpAdapter();