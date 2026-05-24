const AboutAuthor = require('../models/AboutAuthor');

const defaultProfile = {
  name: 'ADELA',
  bio: 'ADELA writes about product decisions, web systems, and the practical lessons that show up while building useful digital experiences.'
};

async function getProfileDocument() {
  let profile = await AboutAuthor.findOne().sort({ createdAt: 1 });

  if (!profile) {
    profile = await AboutAuthor.create(defaultProfile);
  }

  return profile;
}

exports.getAboutAuthor = async (req, res) => {
  try {
    const profile = await getProfileDocument();
    res.json(profile);
  } catch (error) {
    console.error('Error fetching about author profile:', error);
    res.status(500).json({ message: 'Error fetching about author profile' });
  }
};

exports.updateAboutAuthor = async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const bio = String(req.body.bio || '').trim();

    if (!name || !bio) {
      return res.status(400).json({ message: 'Author name and bio are required' });
    }

    if (bio.length > 700) {
      return res.status(400).json({ message: 'Author bio must be 700 characters or fewer' });
    }

    const current = await getProfileDocument();
    const profile = await AboutAuthor.findByIdAndUpdate(
      current._id,
      { name, bio },
      { new: true, runValidators: true }
    );

    res.json(profile);
  } catch (error) {
    console.error('Error updating about author profile:', error);
    res.status(500).json({ message: 'Error updating about author profile' });
  }
};
