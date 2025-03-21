export async function fetchUser(token) {
    try {
        const res = await fetch('https://dev.conteudointimo.com.br/get-user', {
            mode: 'same-origin',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            return await res.json();
        } else {
            throw new Error(res.status);
        }
    } catch (error) {
        console.error('Failed to fetch user', error);
        throw error;
    }
}

export async function fetchTweets(token) {
    try {
        const res = await fetch('https://dev.conteudointimo.com.br/tweet-story/all-tweet-user', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            return await res.json();
        } else {
            throw new Error(res.status);
        }
    } catch (error) {
        console.error('Failed to fetch tweets', error);
        throw error;
    }
}

export async function postTweet(token, content) {
    try {
        const res = await fetch('https://dev.conteudointimo.com.br/tweet-story/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ content })
        });
        if (res.ok) {
            return await res.json();
        } else {
            throw new Error(res.status);
        }
    } catch (error) {
        console.error('Failed to post tweet', error);
        throw error;
    }
}

export async function deleteTweet(token, id) {
    try {
        const res = await fetch(`https://dev.conteudointimo.com.br/tweets/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            return await res.json();
        } else {
            throw new Error(res.status);
        }
    } catch (error) {
        console.error('Failed to delete tweet', error);
        throw error;
    }
}
