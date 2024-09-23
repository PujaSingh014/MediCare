import requests
from bs4 import BeautifulSoup
import pandas as pd

doctor_names = []
doctor_specializations = []
doctor_degrees=[]
doctor_locations = []


def scrape_page(page_num):
    url = f'https://www.drdata.in/list-doctors.php?search=Doctor&state=&state=Uttar%20Pradesh&page={page_num}'
    response = requests.get(url)
    print(response.status_code)
    if(response.status_code==200):
        soup = BeautifulSoup(response.text, 'html.parser')
        
    doctors_data = soup.find('section', id='no-more-tables').table.tbody.find_all('tr')

    for doctor in doctors_data:
        allData = doctor.find_all('td')
        name = allData[0].text.strip()
        specialization = allData[1].text.strip()
        degree = allData[2].text.strip()
        city = allData[4].text.strip()

        doctor_names.append(name)
        doctor_specializations.append(specialization)
        doctor_degrees.append(degree)
        doctor_locations.append(city)


for page in range(1, 21):
    scrape_page(page)


df = pd.DataFrame({
    'Doctor_Name': doctor_names,
    'Specialization': doctor_specializations,
    'Degree': doctor_degrees,
    'Location': doctor_locations
})

df.to_excel('doctors_data.xlsx', index=False)