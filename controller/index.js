const Index = require("../model/index");

exports.createIndex = async (req, res, next) => {

    try {

        // const { title, description, reminder } = req.body;
        console.log(req.body)
        const index = await Index.create(req.body);
        res.status(200).json({
            status: "success",
            index
        })

    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: "not create index"
        })

    }

}

exports.allIndex = async (req, res, next) => {
    try {

        const limitValue = req.query.limit || 2;
        const skipValue = req.query.skip || 0;
        const index = await Index.find()
            .limit(limitValue).skip(skipValue);

        res.status(200).json({
            status: "success",
            index
        })

    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: "user or data is not found"
        })
    }
}

exports.indexId = async (req, res, next) => {
    try {
        const index = await Index.findById(req.params.id)
        console.log(req.params.id)

        if (!index) {
            return new Error("user is not defined")
        }
        res.status(200).json({
            status: "success",
            index
        })


    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "user is not defined"
        })

    }
}

exports.updateId = async (req, res, next) => {
    try {

        const index = await Index.findByIdAndUpdate(req.params.id, req.body)

        if (!index) {
            return new Error("user is not defined")
        }

        res.status(202).json({
            status: "success",
            index
        })


    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: "user is not update"
        })
    }
}

exports.deleteId = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const index = await Index.findById(req.params.id);
        await index.remove();
        res.status(202).json({
            status: "success",
            message: "user is deleted"
        })
    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: "user is not found for the delete id"
        })
    }
}

