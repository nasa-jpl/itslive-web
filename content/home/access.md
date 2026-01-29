---
title: "Data Access"
weight: 20
---

### Data Portal

Web app to explore and download annual velocity mosaics and image pair data:

<div class="columns">
  <div class="column">
    <a href="https://nsidc.org/apps/itslive/" target="_blank" class="custom-image">
      <img src="images/webapp.jpg" alt="Screen of the NSIDC data portal"/>
    </a>
  </div>
  <div class="column"></div>
</div>

### STAC API

ITS_LIVE data is now accessible through a [STAC](https://stacspec.org/) API at [https://stac.itslive.cloud](https://stac.itslive.cloud). The API supports two collections:

- **itslive-granules**: Individual image pair velocity measurements (Landsat, Sentinel-1, Sentinel-2)
- **itslive-cubes**: Cloud-optimized Zarr data cubes for time series analysis

The API supports spatial, temporal, and property-based filtering.

<details open>
<summary class="details-title"><strong>Python with pystac-client</strong></summary>

The recommended way to access the STAC API is using the [pystac-client](https://pystac-client.readthedocs.io/) library:

```python
from pystac_client import Client

# Connect to the ITS_LIVE STAC API
catalog = Client.open("https://stac.itslive.cloud")

# Search for image pairs over a region and time range
# Example: Iceland, 2015-2020
search = catalog.search(
    collections=["itslive-granules"],
    bbox=[-24.60, 63.78, -15.11, 66.30],  # west, south, east, north
    datetime=["2015-01-01", "2020-12-31"],
    max_items=10
)

# Iterate through results
for item in search.items():
    print(f"ID: {item.id}")
    print(f"Date: {item.properties['datetime']}")
    print(f"Data URL: {item.assets['data'].href}")
    # Access S3 URL directly for cloud workflows
    print(f"S3 URL: {item.assets['data'].alternate['s3'].href}")
```

</details>

<details>
<summary class="details-title"><strong>Advanced Filtering</strong></summary>

The API supports CQL2 (Common Query Language) filters for more complex queries:

```python
from pystac_client import Client

catalog = Client.open("https://stac.itslive.cloud")

# Search with property filters
search = catalog.search(
    collections=["itslive-granules"],
    bbox=[-24.60, 63.78, -15.11, 66.30],
    datetime=["2015-01-01", "2020-12-31"],
    query={"sat:platform": {"eq": "LANDSAT-8"}}  # Filter by satellite
)

for item in search.items():
    # Access the NetCDF file
    data_url = item.assets['data'].href
    # Download or process the data...
```

</details>

<details open>
<summary class="details-title"><strong>Accessing Zarr Data Cubes</strong></summary>

```python
from pystac_client import Client
import xarray as xr

catalog = Client.open("https://stac.itslive.cloud")

# Search for data cubes
search = catalog.search(
    collections=["itslive-cubes"],
    bbox=[-24.60, 63.78, -15.11, 66.30],
)

item = next(search.items())
# Open Zarr cube directly with xarray
ds = xr.open_zarr(item.assets['zarr'].href)
print(ds)
```

</details>

> **Note**: For V1 data hosted at NSIDC (before April 2023), access requires authentication with NASA Earthdata Login (EDL). See:
> * [NSIDC Programmatic Access Guide](https://nsidc.org/data/user-resources/help-center/programmatic-data-access-guide)
> * [earthaccess library](https://github.com/nsidc/earthaccess) for EDL authentication in Python

### Jupyter Notebooks

<details>
<summary class="details-title"><strong>Interactive Notebooks & Tutorials</strong></summary>

Jupyter notebooks to access and visualize ice velocity time series from ITS_LIVE data cubes.

Repository: [https://github.com/nasa-jpl/its_live](https://github.com/nasa-jpl/its_live)

<div class="columns">
  <div class="column">
    <p>
    Click the binder link below to browse the data now <br><br>
     <a href="https://itslive-dashboard.labs.nsidc.org/" target="_blank"><img src="https://img.shields.io/badge/Launch-Voilà-lightblue?atyle=plastic&logo=jupyter" class="custom-image" alt="Voila-based dashboard"/></a><br>
    <a href="https://mybinder.org/v2/gh/nasa-jpl/its_live/main?urlpath=lab/tree/notebooks" target="_blank"><img src="https://img.shields.io/badge/Launch-Binder-lightgreen?atyle=plastic&logo=jupyter" class="custom-image" alt="MyBinder notebook"/></a><br>
  <a href="https://www.youtube.com/watch?v=G7E7rE5npvg" target="_blank"><img src="images/youtube-screen.jpg" alt="Youtube tutorial"></a>
   </p>
  </div>
  <div class="column"></div>
</div>

</details>

### Data Cubes

[GeoJSON Data Cubes Catalog (5MB)](https://its-live-data.s3.amazonaws.com/datacubes/catalog_v02.json)


In addition to NetCDF image pairs and mosaics, ITS_LIVE produces cloud-optimized [`Zarr`](https://zarr.readthedocs.io/en/stable/) datacubes, which contain all image-pair data, co-aligned on a common grid for simplified data access. Cloud optimization enables rapid analysis without intermediary data servers, and ITS_LIVE datacubes map directly into Python [`xarray`](https://docs.xarray.dev/en/stable/) or Julia  [`ZArray`](https://docs.julialang.org/en/v1/manual/arrays/) structures. ITS_LIVE provides basic access and plotting tools in both Python and Julia, making it easy to incorporate the datacubes into workflows locally or on remote servers.


