import User from "../models/user.model.js"


export const getUser = async (req,res) => {
    const { username } = req.params;
	try {
		
		const userRes = await fetch(`https://api.github.com/users/${username}`, {
			headers: {
				authorization: `token ${process.env.GITHUB_API_KEY}`,
			},
		});

		const userProfile = await userRes.json();

		const repoRes = await fetch(userProfile.repos_url, {
			headers: {
				authorization: `token ${process.env.GITHUB_API_KEY}`,
			},
		});
		const repos = await repoRes.json();

		res.status(200).json({ userProfile, repos });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export const likeProfile = async (req,res) => {
	try {
		const {username} = req.params
		const user = await User.findById(req.user._id.toString())
		const userToLike = await User.findOne({username})
		if (!userToLike) {
			return res.status(404).json({error:'user is not a member'})
		}

		if (user.likedProfiles.includes(userToLike.username)) {
			return res.status(400).json({error:"user already liked"})
		}
		userToLike.likedBy.push({username:user.username,avatarUrl:user.avatarUrl,likedDate:Date.now()})
		user.likedProfiles.push(userToLike.username)

		await Promise.all(user.save(),userToLike.save())

		res.status(200).json({message:'User liked '})
	} catch (error) {
		res.status(500).json({error:error.message})
	}
}

export const getLikes = async (req,res) => {
	try {
		const user = await User.findById(req.user._id.toString())
		res.status(200).json({likedBy:user.likedBy})
	} catch (error) {
		res.status(500).json({error:error.message})
	}
}