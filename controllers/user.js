import user from '../models/user.js'

export const getAll = async (req, res) => {
    try {
        const users = await user.find();

        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const addUser = async(req,res) =>{
    try{
        const userData = await user.create(req.body);

        return res.status(200).json({
            success:true,
            data:userData
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Server error'});
    }
}

export const updateUser = async(req,res) =>{
    try{
        const { name, email, age } = req.body

        const userId= req.params.id;

        console.log(userId);

        const userupdate= await user.findByIdAndUpdate(userId,{name,email,age},{new:true,runValidators:true});

        return res.status(200).json({userupdate});

    } catch(error){
        console.log(error);
        return res.status(500).json({error:error});
    }
}

export const deleteUser = async(req,res)=>{
    try{
        const userId=req.params.id;

        const deletedUser=await user.findByIdAndDelete({_id:userId});

        res.status(200).send();
    }catch(error){
        return res.status(500).json({error:error});
    }
}