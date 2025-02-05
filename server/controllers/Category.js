const Category=require('../models/Category');

exports.createCategory=async(req,res)=>{
    try{
        const {name,description}=req.body;

        const categoryDetails=Category.create({
            name:name,
            description:description
        });

        return res.status(200).json({
            success:true,
            message:'Category created successfully'
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Somehing went wrong while creating Category'
        });
    }
}



exports.getAllCategories=async(req,res)=>{
    try{
        const allCategories=await Category.find({},{name:true, description:true});

        return res.status(200).json({
            success:true,
            message:'All categories fetched successfully',
            data:allCategories
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Somehing wetn wrong fetching all categories'
        });
    }
}




exports.categoryPageDetails=async(req,res)=>{
    try{
        const {categoryId}=req.params;

        const selectedCategory=await Category.findById(categoryId)
                    .populate({
                        path:'courses', 
                        populate:{
                            path:'instructor'
                        }
                    })
                    .exec();

        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:'Category not found'
            });
        }

        if(selectedCategory.length===0){
            return res.status(404).json({
                success:false,
                message:'No courses found for the selected category'
            });
        }

        const differentCategory=await Category.find({
            _id:{$ne:categoryId},
        }).populate({
            path:'courses', 
            populate:{
                path:'instructor'
            }
        }).exec();

        let differentCourses=[];
        for(const category of differentCategory){
            differentCourses.push(...category.courses);
        }

        const allCategories=await Category.find().populate({path:'courses', match:{status:'Published'},populate:{path:'instructor'}});
        const allCourses=allCategories.flatMap((category)=>category.courses);
        const mostSellingCourses=allCourses
            .sort((a,b)=>b.studentsEnrolled.length-a.studentsEnrolled.length)
            .slice(0,4);

        res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCourses,
                mostSellingCourses
            }
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Internal server error',
            error:error.message
        });
    }
}