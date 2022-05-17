---
title: "Data Access"
weight: 20
---

### Data Portal

Web app to explore and download annual velocity mosaics and image pair data.

<div class="columns">
  <div class="column">
    <a href="https://nsidc.org/apps/itslive/" target="_blank" class="custom-image">
      <img src="images/webapp.jpg" />
    </a>
  </div>
  <div class="column"></div>
</div>

### Jupyter Notebooks

Jupyter notebooks to access and visualize ice velocity time series from ITS_LIVE data cubes.

Repository: [https://github.com/nasa-jpl/its_live](https://github.com/nasa-jpl/its_live)

<div class="columns">
  <div class="column">
    <p>
    Click the binder link below to browse the data now <br><br>
     <a href="https://mybinder.org/v2/gh/nasa-jpl/its_live/lite?urlpath=voila/render/notebooks/voila-widget.ipynb" target="_blank"><img src="https://img.shields.io/badge/Launch-Voilà-lightblue?atyle=plastic&logo=jupyter"/></a>
    <a href="https://mybinder.org/v2/gh/nasa-jpl/its_live/main?urlpath=lab/tree/notebooks" target="_blank"><img src="https://img.shields.io/badge/Launch-Binder-lightgreen?atyle=plastic&logo=jupyter" class="custom-image"/></a>
  </p>
  <a href="https://www.youtube.com/watch?v=G7E7rE5npvg" target="_blank"><img src="images/youtube-screen.jpg"></a>
  </div>
  <div class="column"></div>
</div>


### API

[OpenAPI endpoint](https://nsidc.org/apps/itslive-search/docs)


Python

<div class="align-left">


```python
import requests

base_api = "https://nsidc.org/apps/itslive-search/velocities/urls"
# Iceland
params = {
  "bbox": "-24.60,63.78,-15.11,66.30",
  "start": "1985-02-01",
  "end": "2021-05-01",
  "percent_valid_pixels": 20, # percent of valid glacier pixels
  "min_interval": 7, # days of separation between image pairs
  "max_interval": 100 # days of separation between image pairs
}
# This will return a list of NetCDF files in AWS S3 that can be accessed
# in the cloud or externally
velocity_pairs = requests.get(base_api, params=params)
```


</div>
<br>

### Data Cubes


[GeoJSON Data Cubes Catalog (5MB)](https://its-live-data.s3.amazonaws.com/datacubes/catalog_v02.json)


In addition to NetCDF image pairs and mosaics, ITS_LIVE produces cloud-optimized [`Zaar`](https://zarr.readthedocs.io/en/stable/) datacubes, which contain all image-pair data, co-aligned on a common grid for simplified data access. Cloud optimization enables rapid analysis without intermediary data servers, and ITS_LIVE datacubes map directly into Python [`xarray`](https://docs.xarray.dev/en/stable/) or Julia  [`ZArray`](https://docs.julialang.org/en/v1/manual/arrays/) structures. ITS_LIVE provides basic access and plotting tools in both Python and Julia, making it easy to incorporate the datacubes into workflows locally or on remote servers.


