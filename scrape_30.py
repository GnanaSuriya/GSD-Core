import urllib.request
import re
import json

queries = {
    "PC Builds": "A2D+Channel+PC+Build+gaming",
    "Reviews": "A2D+Channel+Review+smartphone+laptop",
    "Hardware": "A2D+Channel+post+mortem+processor+motherboard",
    "Tech News": "A2D+Channel+tech+news+scam",
    "Experiments": "A2D+Channel+experiment+AI+weird"
}

results = {}
seen_ids = set()

def search_yt(query, limit=6):
    req = urllib.request.Request(
        f'https://www.youtube.com/results?search_query={query}',
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching {query}: {e}")
        return []
        
    match = re.search(r'var ytInitialData = (\{.*?\});</script>', html)
    if not match: return []
    data = json.loads(match.group(1))
    videos = []
    
    def find_videos(obj):
        if isinstance(obj, dict):
            if 'videoRenderer' in obj:
                v = obj['videoRenderer']
                owner = v.get('ownerText', {}).get('runs', [{}])[0].get('text', '').lower()
                if 'a2d' in owner:
                    vid = v.get('videoId')
                    title = v.get('title', {}).get('runs', [{}])[0].get('text')
                    thumb = v.get('thumbnail', {}).get('thumbnails', [{}])[-1].get('url')
                    if vid and title and thumb and vid not in seen_ids:
                        videos.append({"id": vid, "title": title, "thumbnail": thumb.split('?')[0]})
                        seen_ids.add(vid)
            for k, val in obj.items():
                if len(videos) < limit:
                    find_videos(val)
        elif isinstance(obj, list):
            for item in obj:
                if len(videos) < limit:
                    find_videos(item)
                    
    find_videos(data)
    return videos

for cat, q in queries.items():
    print(f"Searching for {cat}...")
    vids = search_yt(q, 6)
    results[cat] = vids
    if len(vids) < 6:
        # Fallback broad search
        more = search_yt("A2D+Channel", 6 - len(vids))
        vids.extend(more)

with open('videos_30.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

for cat, vids in results.items():
    print(cat, len(vids))
