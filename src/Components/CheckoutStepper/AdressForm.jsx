import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

import FormInput from "./FormInput";

const COUNTRIES = [
  { country: "Australia", code: "AU" },
  { country: "Austria", code: "AT" },
  { country: "Belgium", code: "BE" },
  { country: "Bulgaria", code: "BG" },
  { country: "Brazil ", code: "BR" },
  { country: "Canada", code: "CA" },
  { country: "Cyprus", code: "CY" },
  { country: "Czech Republic", code: "CZ" },
  { country: "Denmark", code: "DK" },
  { country: "Estonia", code: "EE" },
  { country: "Finland", code: "FI" },
  { country: "France", code: "FR" },
  { country: "Germany", code: "DE" },
  { country: "Greece", code: "GR" },
  { country: "Hong Kong", code: "HK" },
  { country: "Hungary", code: "HU" },
  { country: "India", code: "IN" },
  { country: "Ireland", code: "IE" },
  { country: "Italy", code: "IT" },
  { country: "Japan", code: "JP" },
  { country: "Latvia", code: "LV" },
  { country: "Lithuania", code: "LT" },
  { country: "Luxembourg", code: "LU" },
  { country: "Malaysia", code: "MY" },
  { country: "Malta", code: "MT" },
  { country: "Mexico ", code: "MX" },
  { country: "Netherlands", code: "NL" },
  { country: "New Zealand", code: "NZ" },
  { country: "Norway", code: "NO" },
  { country: "Poland", code: "PL" },
  { country: "Portugal", code: "PT" },
  { country: "Romania", code: "RO" },
  { country: "Singapore", code: "SG" },
  { country: "Slovakia", code: "SK" },
  { country: "Slovenia", code: "SI" },
  { country: "Spain", code: "ES" },
  { country: "Sweden", code: "SE" },
  { country: "Switzerland", code: "CH" },
  { country: "United Kingdom", code: "GB" },
  { country: "United States", code: "US" },
];

const AddressForm = ({ submitAdress }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const { han, errors } = useForm();
  const methods = useForm();

  return (
    <div
      style={{
        width: "80%",
        marginLeft: "10%",
        backgroundColor: "whitesmoke",
        padding: ".5rem",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            submitAdress({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address line 1" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country*</InputLabel>
              <Select
                value={shippingCountry}
                required
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {COUNTRIES.map((item) => (
                  <MenuItem
                    key={item.country}
                    value={`${item.code},${item.country}`}
                  >
                    {/* {item.code} */}
                    {item.country}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/*
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {Object.entries(shippingSubdivisions)
                  .map(([code, name]) => ({ id: code, label: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions
                  .map((sO) => ({
                    id: sO.id,
                    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                  }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>*/}
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} variant="outlined" to="/basket">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddressForm;

// const fetchShippingCountries = async (checkoutTokenId) => {
//   const { countries } = await commerce.services.localeListShippingCountries(
//     checkoutTokenId
//   );

//   setShippingCountries(countries);
//   setShippingCountry(Object.keys(countries)[0]);
// };

// const fetchSubdivisions = async (countryCode) => {
//   const { subdivisions } = await commerce.services.localeListSubdivisions(
//     countryCode
//   );

//   setShippingSubdivisions(subdivisions);
//   setShippingSubdivision(Object.keys(subdivisions)[0]);
// };

// const fetchShippingOptions = async (
//   checkoutTokenId,
//   country,
//   stateProvince = null
// ) => {
//   const options = await commerce.checkout.getShippingOptions(
//     checkoutTokenId,
//     { country, region: stateProvince }
//   );

//   setShippingOptions(options);
//   setShippingOption(options[0].id);
// };

// useEffect(() => {
//   fetchShippingCountries(checkoutToken.id);
// }, []);

// useEffect(() => {
//   if (shippingCountry) fetchSubdivisions(shippingCountry);
// }, [shippingCountry]);

// useEffect(() => {
//   if (shippingSubdivision)
//     fetchShippingOptions(
//       checkoutToken.id,
//       shippingCountry,
//       shippingSubdivision
//     );
// }, [shippingSubdivision]);
