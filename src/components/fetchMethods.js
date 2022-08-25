import sources from '../data/sources'

const fetchClusters = async () => {
  const fetchedClusters = await fetch(sources.clusters, {
    method: 'GET',
    credentials: 'include'
  }).catch(err => {
    return {
      status: 500,
    }
  })
  const jsonedClusters = await fetchedClusters.json()
  return {
    status: 200,
    data: jsonedClusters
  }
}

const sendCluster = async (clusterName, clusterURI, timestampStart = 0, timestampEnd = 0) => {
  const clusterSent = await fetch(sources.clusters, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      clusterName: clusterName,
      clusterURI: clusterURI,
      timestampStart: timestampStart,
      timestampEnd: timestampEnd
    })
  })
  .catch(err => {
    return {
      status: 500,
    }
  })
  const jsonedResponse = await clusterSent.json()
  return {
    status: clusterSent.status,
    data: jsonedResponse
  }
}

const sendImages = async (clusterId, files) => {
  const newData = new FormData()
  for (let file of files) {
    newData.append('files', file)
  }
  const imagesSent = await fetch(sources.imageNames + clusterId, {
    method: 'POST',
    credentials: 'include',
    body: newData
  })
  .catch(err => {
    return {
      status: 500,
    }
  })
  return {
    status: imagesSent.status
  }
}

export { fetchClusters, sendCluster, sendImages }
